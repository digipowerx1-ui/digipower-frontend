/**
 * Stock Service - Fetch and format stock data for email consumption
 * Reuses the existing fetchStockData function from index.js
 */

import { logger } from '../utils/logger.js';
import { retryAsync } from '../utils/retry.js';

const DEFAULT_SYMBOL = 'DGXX';

/**
 * Format volume in human-readable format (e.g., 1.2M, 450K)
 * @param {number} volume - Raw volume number
 * @returns {string} - Formatted volume
 */
function formatVolume(volume) {
  if (!volume || volume === 0) return 'N/A';

  if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(2)}M`;
  } else if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}K`;
  }

  return volume.toLocaleString();
}

/**
 * Fetch stock data from Massive API (Polygon) - imported logic from index.js
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Object>} - Stock data
 */
async function fetchStockData(symbol = DEFAULT_SYMBOL) {
  const apiKey = process.env.MASSIVE_API_KEY;

  if (!apiKey) {
    throw new Error('MASSIVE_API_KEY is not set in environment');
  }

  const now = new Date();
  const today = now.toISOString().split('T')[0];

  // Also try yesterday's date as fallback (useful for after-hours/early morning)
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // With paid real-time plan, use the best endpoints available
  const snapshotUrl = `https://api.massive.com/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`;
  const quoteUrl = `https://api.massive.com/v3/quotes/${symbol}?limit=1&order=desc&apiKey=${apiKey}`;
  const lastTradeUrl = `https://api.massive.com/v3/trades/${symbol}?limit=1&order=desc&apiKey=${apiKey}`;
  const dailyUrl = `https://api.massive.com/v1/open-close/${symbol}/${today}?adjusted=true&apiKey=${apiKey}`;
  const dailyYesterdayUrl = `https://api.massive.com/v1/open-close/${symbol}/${yesterdayStr}?adjusted=true&apiKey=${apiKey}`;

  const [snapshotRes, quoteRes, tradeRes, dailyRes, dailyYesterdayRes] = await Promise.all([
    fetch(snapshotUrl).catch((err) => {
      logger.debug('Snapshot request failed:', err.message);
      return null;
    }),
    fetch(quoteUrl).catch((err) => {
      logger.debug('Quote request failed:', err.message);
      return null;
    }),
    fetch(lastTradeUrl).catch((err) => {
      logger.debug('Trade request failed:', err.message);
      return null;
    }),
    fetch(dailyUrl).catch((err) => {
      logger.debug('Daily request failed:', err.message);
      return null;
    }),
    fetch(dailyYesterdayUrl).catch((err) => {
      logger.debug('Daily (yesterday) request failed:', err.message);
      return null;
    }),
  ]);

  const snapshotOk = snapshotRes?.ok;
  const quoteOk = quoteRes?.ok;
  const tradeOk = tradeRes?.ok;
  const dailyOk = dailyRes?.ok;
  const dailyYesterdayOk = dailyYesterdayRes?.ok;

  // Log response statuses for debugging
  logger.debug('API Response Status:', {
    snapshot: snapshotRes?.status,
    quote: quoteRes?.status,
    trade: tradeRes?.status,
    daily: dailyRes?.status,
    dailyYesterday: dailyYesterdayRes?.status
  });

  if (!snapshotOk && !quoteOk && !tradeOk && !dailyOk && !dailyYesterdayOk) {
    // Try to get more details about the failures
    const errors = [];
    if (snapshotRes && !snapshotOk) errors.push(`Snapshot: ${snapshotRes.status}`);
    if (quoteRes && !quoteOk) errors.push(`Quote: ${quoteRes.status}`);
    if (tradeRes && !tradeOk) errors.push(`Trade: ${tradeRes.status}`);
    if (dailyRes && !dailyOk) errors.push(`Daily: ${dailyRes.status}`);
    if (dailyYesterdayRes && !dailyYesterdayOk) errors.push(`Daily(yesterday): ${dailyYesterdayRes.status}`);

    throw new Error(`Unable to fetch stock data from any source. ${errors.length > 0 ? 'Errors: ' + errors.join(', ') : ''}`);
  }

  const snapshotData = snapshotOk ? await snapshotRes.json() : null;
  const quoteData = quoteOk ? await quoteRes.json() : null;
  const tradeData = tradeOk ? await tradeRes.json() : null;
  const dailyData = dailyOk ? await dailyRes.json() : null;
  const dailyYesterdayData = dailyYesterdayOk ? await dailyYesterdayRes.json() : null;

  const snapshot = snapshotData?.ticker;
  const quote = quoteData?.results?.[0];
  const trade = tradeData?.results?.[0];
  const daily = dailyData || dailyYesterdayData; // Use yesterday's data if today's not available

  // Get the most recent price from available sources
  const livePrice =
    Number(quote?.ask_price) ||
    Number(trade?.price) ||
    Number(quote?.bid_price) ||
    Number(snapshot?.day?.c) ||
    Number(snapshot?.min?.c) ||
    Number(snapshot?.lastTrade?.p) ||
    Number(daily?.close) ||
    Number(daily?.afterHours) ||
    Number(daily?.high) ||
    Number(daily?.open);

  const openPrice =
    Number(snapshot?.day?.o) ||
    Number(daily?.open) ||
    Number(trade?.price) ||
    null;

  const volume =
    Number(snapshot?.day?.v) ||
    Number(daily?.volume) ||
    Number(trade?.size) ||
    0;

  const high =
    Number(snapshot?.day?.h) ||
    Number(daily?.high) ||
    livePrice ||
    null;

  const low =
    Number(snapshot?.day?.l) ||
    Number(daily?.low) ||
    livePrice ||
    null;

  if (!livePrice) {
    throw new Error('Stock price unavailable at this time');
  }

  const change = openPrice ? livePrice - openPrice : 0;
  const changePercent = openPrice ? (change / openPrice) * 100 : 0;

  // Handle timestamp
  let lastUpdated;
  try {
    const quoteTime = quote?.sip_timestamp;
    const tradeTime = trade?.sip_timestamp || trade?.participant_timestamp;
    const snapshotTime = snapshot?.updated || snapshot?.lastTrade?.t;
    const timestamp = quoteTime || tradeTime || snapshotTime;

    if (timestamp) {
      const ms = timestamp > 10000000000000 ? Math.floor(timestamp / 1000000) : timestamp;
      const date = new Date(ms);
      lastUpdated = isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
    } else {
      lastUpdated = new Date().toISOString();
    }
  } catch {
    lastUpdated = new Date().toISOString();
  }

  return {
    symbol,
    price: Number(livePrice.toFixed(4)),
    open: openPrice !== null ? Number(openPrice.toFixed(4)) : null,
    high: high !== null ? Number(high.toFixed(4)) : null,
    low: low !== null ? Number(low.toFixed(4)) : null,
    volume,
    change: Number(change.toFixed(4)),
    changePercent: Number(changePercent.toFixed(4)),
    lastUpdated
  };
}

/**
 * Get stock data formatted for email consumption
 * @param {string} symbol - Stock symbol (defaults to DGXX)
 * @returns {Promise<Object>} - Formatted stock data for email
 */
export async function getStockDataForEmail(symbol = DEFAULT_SYMBOL) {
  logger.info(`Fetching stock data for ${symbol}...`);

  try {
    // Fetch with retry logic
    const rawData = await retryAsync(() => fetchStockData(symbol), 3, 2000);

    // Format for email template
    const emailData = {
      symbol: rawData.symbol,
      price: rawData.price,
      change: rawData.change,
      changePercent: rawData.changePercent,
      direction: rawData.change > 0 ? 'up' : rawData.change < 0 ? 'down' : 'neutral',
      open: rawData.open,
      close: rawData.price, // Current price is the "close" for EOD email
      high: rawData.high,
      low: rawData.low,
      volume: formatVolume(rawData.volume),
      volumeRaw: rawData.volume,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      lastUpdated: rawData.lastUpdated
    };

    logger.info(`✓ Stock data fetched: $${emailData.price} (${emailData.changePercent > 0 ? '+' : ''}${emailData.changePercent.toFixed(2)}%)`);

    return emailData;

  } catch (error) {
    logger.error('Failed to fetch stock data:', error.message);
    throw error;
  }
}
