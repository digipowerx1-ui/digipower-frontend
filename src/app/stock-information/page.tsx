"use client";

import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
// import { Helmet } from "react-helmet-async";
import GradientText from "@/components/GradientText";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, BarChart3, ArrowUp, ArrowDown, Clock } from "lucide-react";

type RangeKey = "1M" | "3M" | "6M" | "1Y";

interface LiveStockData {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    high: number | null;
    low: number | null;
    open: number | null;
    lastUpdated: string;
    source?: string;
}

interface ChartPoint {
    date: string;
    price: number;
    volume: number;
}

const RANGE_CONFIG: Record<RangeKey, { days: number; step: number }> = {
    "1M": { days: 30, step: 1 },
    "3M": { days: 90, step: 3 },
    "6M": { days: 180, step: 6 },
    "1Y": { days: 365, step: 14 },
};

const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined || Number.isNaN(value)) return "—";
    return `$${value.toFixed(2)}`;
};

const formatVolume = (value: number | null | undefined) => {
    if (!value || Number.isNaN(value)) return "—";
    return value.toLocaleString("en-US");
};

export default function Page() {
    // Use Vercel serverless functions (same domain, HTTPS)
    // This avoids mixed content issues when calling HTTP backend from HTTPS frontend
    const api = (path: string) => {
        const trimmed = path.startsWith("/") ? path : `/${path}`;
        return trimmed;
    };

    const [timeRange, setTimeRange] = useState<RangeKey>("3M");
    const [liveStock, setLiveStock] = useState<LiveStockData | null>(null);
    const [isLoadingLive, setIsLoadingLive] = useState(true);
    const [liveError, setLiveError] = useState<string | null>(null);
    const [chartData, setChartData] = useState<ChartPoint[]>([]);
    const [chartError, setChartError] = useState<string | null>(null);
    const [chartLoading, setChartLoading] = useState(false);
    const [cachedCharts, setCachedCharts] = useState<Partial<Record<RangeKey, ChartPoint[]>>>({});

    useEffect(() => {
        const fetchLiveQuote = async () => {
            try {
                setIsLoadingLive(true);
                setLiveError(null);
                const response = await fetch(api("/api/live-stock"));
                if (!response.ok) {
                    throw new Error("Failed to fetch live quote");
                }
                const contentType = response.headers.get("content-type") || "";
                if (!contentType.includes("application/json")) {
                    const text = await response.text();
                    throw new Error(`Unexpected response from /api/live-stock: ${text.slice(0, 120)}`);
                }
                const data = await response.json();
                setLiveStock({
                    symbol: data.symbol || "DGXX",
                    price: Number(data.price),
                    change: Number(data.change),
                    changePercent: Number(data.changePercent),
                    volume: Number(data.volume),
                    high: data.high !== null ? Number(data.high) : null,
                    low: data.low !== null ? Number(data.low) : null,
                    open: data.open !== null ? Number(data.open) : null,
                    lastUpdated: data.lastUpdated,
                    source: data.source,
                });
            } catch (err) {
                console.error("Error fetching live stock:", err);
                setLiveError("Unable to fetch live stock price right now.");
                // Keep UI responsive in dev if the API route isn't running (e.g., not using `vercel dev`)
                if (!liveStock) {
                    setLiveStock({
                        symbol: "DGXX",
                        price: 3.21,
                        change: -0.46,
                        changePercent: -12.53,
                        volume: 6135229,
                        high: 3.75,
                        low: 3.19,
                        open: 3.59,
                        lastUpdated: new Date().toISOString(),
                        source: "fallback",
                    });
                }
            } finally {
                setIsLoadingLive(false);
            }
        };

        fetchLiveQuote();
        // Poll every 60 seconds instead of 5 seconds to reduce API hits
        // Stock data doesn't change frequently enough to justify 5-second polling
        const interval = setInterval(fetchLiveQuote, 60_000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchChartData = async () => {
            if (cachedCharts[timeRange]) {
                setChartData(cachedCharts[timeRange]);
                setChartError(null);
                return;
            }

            try {
                setChartLoading(true);
                setChartError(null);

                const { days, step } = RANGE_CONFIG[timeRange];
                const today = new Date();
                const requests: Promise<any>[] = [];
                const labels: string[] = [];

                for (let i = days - 1; i >= 0; i -= step) {
                    const date = new Date(today);
                    date.setDate(date.getDate() - i);
                    const dateString = date.toISOString().split("T")[0];
                    labels.push(
                        date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })
                    );

                    requests.push(
                        fetch(api(`/api/stock?date=${dateString}`))
                            .then((res) => (res.ok ? res.json() : null))
                            .catch(() => null)
                    );
                }

                const results = await Promise.all(requests);
                const points: ChartPoint[] = [];

                results.forEach((data, index) => {
                    if (data && data.status === "OK") {
                        const currentPrice =
                            data.close ?? data.preMarket ?? data.afterHours ?? data.high ?? data.open;

                        if (currentPrice) {
                            points.push({
                                date: labels[index],
                                price: Number(currentPrice.toFixed(2)),
                                volume: data.volume || 0,
                            });
                        }
                    }
                });

                if (!points.length) {
                    setChartError("No chart data available right now.");
                } else {
                    setChartData(points);
                    setCachedCharts((prev) => ({ ...prev, [timeRange]: points }));
                }
            } catch (err) {
                console.error("Error loading chart data:", err);
                setChartError("Unable to load chart data at the moment.");
            } finally {
                setChartLoading(false);
            }
        };

        fetchChartData();
    }, [timeRange]);

    const formattedLastUpdated = useMemo(() => {
        if (!liveStock?.lastUpdated) return null;
        return new Date(liveStock.lastUpdated).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    }, [liveStock]);

    const changePositive = liveStock ? liveStock.changePercent >= 0 : true;

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {payload[0].payload.date}
                    </p>
                    <p className="text-lg font-bold text-brand-cyan">
                        ${payload[0].value.toFixed(2)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            {/* ⭐ PAGE TITLE ADDED HERE */}
            {/* <Helmet>
        <title>DigiPowerX Share Information | AI Cloud Infrastructure Company
        </title>
        <meta
          name="description"
          content="DigiPowerX Stock Information | Investor Insights on AI Cloud, Scalable Cloud Infrastructure, and High-Density Data Center Expansion."
        />
      </Helmet> */}
            <Navigation />

            {/* ======================= HERO SECTION ======================= */}
            <section className="py-24 px-6 text-center text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl font-bold mb-4 mt-20"
                >
                    <GradientText>Stock Information</GradientText>
                </motion.h1>

                {/* Underline */}
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "160px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-1.5 bg-gradient-to-r from-brand-navy to-brand-cyan mx-auto rounded-full mb-8"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-lg text-gray-500 max-w-2xl mx-auto"
                >
                    Stay up to date with DigiPowerX (Nasdaq: DGXX) stock performance, trends, and key trading metrics.
                </motion.p>
            </section>


            {/* ======================= STOCK CARDS ======================= */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {/* CARD 1 – Price */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group h-full p-8 bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/50 hover:border-brand-cyan/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(1,211,255,0.15)] relative overflow-hidden rounded-2xl dark:from-slate-900 dark:to-slate-800 dark:border-slate-700"
                    >
                        {isLoadingLive && (
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent pointer-events-none"></div>
                        )}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/10 to-brand-navy/10 flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-brand-cyan" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                Nasdaq: {liveStock?.symbol || "DGXX"}
                            </h3>
                        </div>
                        {isLoadingLive ? (
                            <div className="space-y-3">
                                <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-32 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-48 animate-pulse"></div>
                            </div>
                        ) : (
                            <>
                                <p className="text-4xl font-bold text-brand-cyan">
                                    {formatCurrency(liveStock?.price)}
                                </p>
                                <p className="text-gray-400 text-sm mt-2">
                                    {formattedLastUpdated
                                        ? `As of ${formattedLastUpdated}`
                                        : liveError || "—"}
                                </p>
                            </>
                        )}
                    </motion.div>

                    {/* CARD 2 – Price Change */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group h-full p-8 bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/50 hover:border-brand-cyan/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(1,211,255,0.15)] relative overflow-hidden rounded-2xl dark:from-slate-900 dark:to-slate-800 dark:border-slate-700"
                    >
                        {isLoadingLive && (
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent pointer-events-none"></div>
                        )}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/10 to-brand-navy/10 flex items-center justify-center">
                                {changePositive ? (
                                    <TrendingUp className="w-6 h-6 text-green-500" />
                                ) : (
                                    <TrendingDown className="w-6 h-6 text-red-500" />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Price Change</h3>
                        </div>
                        {isLoadingLive ? (
                            <div className="space-y-3">
                                <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-28 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-20 animate-pulse"></div>
                            </div>
                        ) : liveError ? (
                            <p className="text-sm font-semibold text-red-500">{liveError}</p>
                        ) : (
                            <>
                                <p
                                    className={`text-3xl font-bold ${changePositive ? "text-green-500" : "text-red-500"
                                        }`}
                                >
                                    {changePositive ? "▲" : "▼"} {formatCurrency(liveStock?.change)}
                                </p>
                                <p className="text-gray-400 text-sm mt-2">
                                    {liveStock ? `${liveStock.changePercent.toFixed(2)}%` : "—"}
                                </p>
                            </>
                        )}
                    </motion.div>

                    {/* CARD 3 – Volume */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group h-full p-8 bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/50 hover:border-brand-cyan/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(1,211,255,0.15)] relative overflow-hidden rounded-2xl dark:from-slate-900 dark:to-slate-800 dark:border-slate-700"
                    >
                        {isLoadingLive && (
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent pointer-events-none"></div>
                        )}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/10 to-brand-navy/10 flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-brand-cyan" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Volume</h3>
                        </div>
                        {isLoadingLive ? (
                            <div className="space-y-3">
                                <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-36 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-40 animate-pulse"></div>
                            </div>
                        ) : (
                            <>
                                <p className="text-4xl font-bold text-brand-cyan">
                                    {formatVolume(liveStock?.volume)}
                                </p>
                                <p className="text-gray-400 text-sm mt-2">Shares Traded Today</p>
                            </>
                        )}
                    </motion.div>
                </div>

                {/* SECOND ROW */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-10">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group h-full p-8 bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/50 hover:border-brand-cyan/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(1,211,255,0.15)] relative overflow-hidden rounded-2xl dark:from-slate-900 dark:to-slate-800 dark:border-slate-700"
                    >
                        {isLoadingLive && (
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent pointer-events-none"></div>
                        )}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center">
                                <ArrowUp className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white">Today's High</h3>
                        </div>
                        {isLoadingLive ? (
                            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-28 animate-pulse"></div>
                        ) : (
                            <p className="text-3xl font-bold text-brand-cyan">
                                {formatCurrency(liveStock?.high ?? liveStock?.price ?? null)}
                            </p>
                        )}
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group h-full p-8 bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/50 hover:border-brand-cyan/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(1,211,255,0.15)] relative overflow-hidden rounded-2xl dark:from-slate-900 dark:to-slate-800 dark:border-slate-700"
                    >
                        {isLoadingLive && (
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent pointer-events-none"></div>
                        )}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/10 flex items-center justify-center">
                                <ArrowDown className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white">Today's Low</h3>
                        </div>
                        {isLoadingLive ? (
                            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-28 animate-pulse"></div>
                        ) : (
                            <p className="text-3xl font-bold text-brand-cyan">
                                {formatCurrency(liveStock?.low ?? liveStock?.price ?? null)}
                            </p>
                        )}
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group h-full p-8 bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/50 hover:border-brand-cyan/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(1,211,255,0.15)] relative overflow-hidden rounded-2xl dark:from-slate-900 dark:to-slate-800 dark:border-slate-700"
                    >
                        {isLoadingLive && (
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent pointer-events-none"></div>
                        )}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/10 to-brand-navy/10 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-brand-cyan" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white">Open</h3>
                        </div>
                        {isLoadingLive ? (
                            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-28 animate-pulse"></div>
                        ) : (
                            <p className="text-3xl font-bold text-brand-cyan">
                                {formatCurrency(liveStock?.open ?? liveStock?.price ?? null)}
                            </p>
                        )}
                    </motion.div>
                </div>

                {/* ======================= CHART SECTION ======================= */}
                <section className="py-16 px-6 bg-gray-100 dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto text-center mb-10">
                        <h2 className="text-4xl font-bold">
                            <GradientText>Stock Performance Chart</GradientText>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto mt-2">
                            DGXX stock price trends over recent months.
                        </p>
                    </div>

                    {/* Time Range Selector */}
                    <div className="max-w-4xl mx-auto mb-6 flex justify-center gap-2 flex-wrap">
                        {(["1M", "3M", "6M", "1Y"] as RangeKey[]).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-6 py-2 rounded-lg font-semibold transition-all ${timeRange === range
                                    ? "bg-gradient-to-r from-brand-navy to-brand-cyan text-white shadow-lg"
                                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-gray-300 dark:border-slate-700 hover:border-brand-cyan"
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>

                    {/* Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-2xl shadow-xl p-6"
                    >
                        <div className="h-80 relative">
                            {chartLoading && chartData.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-cyan mx-auto mb-2"></div>
                                        <p className="text-sm text-slate-500 dark:text-gray-400">Loading chart data...</p>
                                    </div>
                                </div>
                            )}

                            {!chartLoading && chartError && (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-sm font-semibold text-red-500">{chartError}</p>
                                </div>
                            )}

                            {!chartError && chartData.length > 0 && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#94a3b8"
                                            style={{ fontSize: "12px" }}
                                        />
                                        <YAxis
                                            stroke="#94a3b8"
                                            style={{ fontSize: "12px" }}
                                            domain={["auto", "auto"]}
                                            tickFormatter={(value) => `$${value.toFixed(2)}`}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#06b6d4"
                                            strokeWidth={3}
                                            fill="url(#colorPrice)"
                                            animationDuration={1000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </div>

                        {/* Chart Legend */}
                        <div className="mt-4 flex justify-between items-center border-t border-gray-200 dark:border-slate-700 pt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-brand-cyan"></div>
                                <span className="text-sm text-slate-600 dark:text-slate-400">Stock Price (USD)</span>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Last Updated</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {formattedLastUpdated || "Waiting for live data..."}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ======================= CTA SECTION ======================= */}
                <section className="py-20 px-6 bg-slate-900 text-white text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Want Real-Time DGXX Alerts?
                    </h2>
                    <p className="max-w-xl mx-auto text-gray-300 mb-8">
                        Sign up to receive instant email notifications about price updates and press releases.
                    </p>
                    <a
                        href="/email-alerts"
                        className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-brand-navy to-brand-cyan text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        Sign up for Email Alerts
                    </a>
                </section>

                <Footer />
            </section>
        </div>
    );
}
