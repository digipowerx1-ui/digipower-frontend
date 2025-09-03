import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp, DollarSign, FileText, Calendar, Users, BarChart3 } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface Presentation {
  id: number;
  title: string;
  description: string | null;
  type: string;
  date: string;
  file?: { url: string };
}

interface SecFiling {
  id: number;
  documentId: string;
  date: string;
  form: string;
  description: string;
  publishedAt: string;
  fileUrl?: string;
}

interface PressRelease {
  id: number;
  title: string;
  description: string | null;
  date: string;
  document?: { url: string; name: string };
}

const InvestorRelations = () => {
  const stockData = {
    price: "$2.37",
    change: "+$0.17",
    volume: "1,287,617",
    marketCap: "$45.2M",
    revenue: "$37.0M",
  };

  const keyMetrics = [
    { label: "Total Revenue (FY 2024)", value: "$37.0M", icon: DollarSign },
    { label: "Mining Sites", value: "3", icon: BarChart3 },
    { label: "Miners Under Management", value: "11.8k+", icon: Users },
    { label: "Electrical Infrastructure", value: "100 MW", icon: TrendingUp },
  ];

  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [filings, setFilings] = useState<SecFiling[]>([]);
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [loadingPresentations, setLoadingPresentations] = useState(true);
  const [loadingFilings, setLoadingFilings] = useState(true);
  const [loadingPressReleases, setLoadingPressReleases] = useState(true);

  useEffect(() => {
    // Fetch Presentations
    const fetchPresentations = async () => {
      try {
        const res = await axios.get(
          "https://artistic-eggs-9d7a8f2a5f.strapiapp.com/api/presentations?populate=*"
        );
        const data: Presentation[] = res.data?.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          type: item.type,
          date: item.date,
          file: item.file ? { url: item.file.url } : undefined,
        }));
        setPresentations(data || []);
      } catch (error) {
        console.error("❌ Error fetching presentations:", error);
        setPresentations([]);
      } finally {
        setLoadingPresentations(false);
      }
    };

    // Fetch SEC Filings
    const fetchFilings = async () => {
      try {
        const res = await axios.get(
          "https://artistic-eggs-9d7a8f2a5f.strapiapp.com/api/sec-filings?populate=*"
        );
        const data: SecFiling[] = res.data?.data.map((f: any) => ({
          id: f.id,
          documentId: f.documentId,
          date: f.date,
          form: f.form,
          description: f.description,
          publishedAt: f.publishedAt,
          fileUrl: f.documents?.url || f.documents?.data?.attributes?.url || "",
        }));
        setFilings(data || []);
      } catch (error) {
        console.error("❌ Error fetching SEC filings:", error);
        setFilings([]);
      } finally {
        setLoadingFilings(false);
      }
    };

    // Fetch Press Releases
    const fetchPressReleases = async () => {
      try {
        const res = await axios.get(
          "https://artistic-eggs-9d7a8f2a5f.strapiapp.com/api/press-releases?populate=*"
        );
        const data: PressRelease[] = res.data?.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          date: item.date,
          document: item.document
            ? { url: item.document.url, name: item.document.name }
            : undefined,
        }));
        setPressReleases(data || []);
      } catch (error) {
        console.error("❌ Error fetching press releases:", error);
        setPressReleases([]);
      } finally {
        setLoadingPressReleases(false);
      }
    };

    fetchPresentations();
    fetchFilings();
    fetchPressReleases();
  }, []);

  return (
    <>
      <Helmet>
        <title>DigiPowerX Investor Relations - Stock Information & Financial Data</title>
        <meta
          name="description"
          content="Access DigiPowerX investor information including stock data, financial reports, presentations, SEC filings, and press releases."
        />
        <meta
          name="keywords"
          content="DGXX stock, investor relations, financial reports, earnings, SEC filings, DigiPowerX investment, press releases"
        />
        <link rel="canonical" href="/investor-relations" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="relative py-24 px-4 bg-gradient-to-r from-brand-dark to-brand-blue overflow-hidden">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/800')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Investor<span className="text-brand-white"> Relations</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 animate-slide-up animation-delay-150">
              Investing in the future of energy infrastructure and digital economy growth
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-bounce-in animation-delay-300">
              <Badge className="bg-brand-success text-white px-4 py-2 text-lg">NASDAQ: DGXX</Badge>
              <Badge className="bg-white text-brand-dark px-4 py-2 text-lg">{stockData.price}</Badge>
              <Badge className="bg-brand-success text-white px-4 py-2 text-lg">{stockData.change}</Badge>
            </div>
          </div>
        </section>

        {/* Stock Information */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-sm text-brand-white uppercase tracking-wide mb-4">Stock Performance</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Real-Time Market Data</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              {Object.entries(stockData).map(([label, value]) => (
                <Card key={label} className="text-center p-6 hover:shadow-card transition-all duration-300">
                  <CardContent>
                    <div className="text-3xl font-bold text-brand-white mb-2">{value}</div>
                    <div className="text-sm text-brand-gray capitalize">{label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="p-8 mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-brand-dark">Stock Performance Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-brand-light-gray rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-brand-white mx-auto mb-4" />
                    <p className="text-brand-gray">Interactive stock chart will be integrated here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-20 px-4 bg-brand-light-gray">
          <div className="container mx-auto text-center">
            <h2 className="text-sm text-brand-white uppercase tracking-wide mb-4">Key Metrics</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Financial & Operational Highlights</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyMetrics.map((metric, index) => (
                <Card key={metric.label} className="p-6 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-2 group animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <CardContent>
                    <metric.icon className="h-12 w-12 text-brand-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-3xl font-bold text-brand-dark mb-2">{metric.value}</div>
                    <div className="text-sm text-brand-gray">{metric.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Investor Resources */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-sm text-brand-white uppercase tracking-wide mb-4 text-center">Investor Resources</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 text-center">Financial Information & Reports</h3>

            <Tabs defaultValue="presentations" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="presentations">Presentations</TabsTrigger>
                <TabsTrigger value="filings">SEC Filings</TabsTrigger>
                <TabsTrigger value="press-releases">Press Releases</TabsTrigger>
              </TabsList>

              {/* Presentations */}
              <TabsContent value="presentations">
                {loadingPresentations ? (
                  <p className="text-center text-gray-500">Loading presentations...</p>
                ) : presentations.length === 0 ? (
                  <p className="text-center text-gray-500">No presentations available</p>
                ) : (
                  <div className="space-y-6">
                    {presentations.map((item) => (
                      <Card key={item.id} className="hover:shadow-card transition-all duration-300">
                        <CardContent className="p-6 flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-brand-dark">{item.title}</h4>
                            <p className="text-brand-gray">{item.description || "No description"}</p>
                            <div className="flex items-center text-sm text-brand-gray mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              {item.date}
                            </div>
                          </div>
                          {item.file?.url && (
                            <Button asChild className="bg-[#123F55] hover:bg-[#2CD2FF] text-white">
                              <a href={item.file.url} target="_blank" rel="noopener noreferrer">
                                <FileText className="h-4 w-4 mr-2" />
                                Download
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* SEC Filings */}
              <TabsContent value="filings">
                {loadingFilings ? (
                  <p className="text-center text-gray-500">Loading SEC filings...</p>
                ) : filings.length === 0 ? (
                  <p className="text-center text-gray-500">No SEC filings available</p>
                ) : (
                  <div className="space-y-6">
                    {filings.map((filing) => (
                      <Card key={filing.id} className="hover:shadow-card transition-all duration-300">
                        <CardContent className="p-6 flex flex-col items-start md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <FileText className="h-12 w-12 text-[#123F55] hover:text-[#2CD2FF] transition-colors duration-300" />
                            <div>
                              <h4 className="text-xl font-bold text-brand-dark">{filing.form}</h4>
                              <p className="text-brand-gray">{filing.description}</p>
                              <p className="text-sm text-brand-gray">
                                Date: {new Date(filing.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {filing.fileUrl ? (
                            <Button asChild className="bg-[#123F55] hover:bg-[#2CD2FF] text-white  text-white mt-2 md:mt-0">
                              <a href={filing.fileUrl} target="_blank" rel="noopener noreferrer">
                                View Document
                              </a>
                            </Button>
                          ) : (
                            <span className="text-gray-400 mt-2 md:mt-0">No document available</span>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Press Releases */}
              <TabsContent value="press-releases">
                {loadingPressReleases ? (
                  <p className="text-center text-gray-500">Loading press releases...</p>
                ) : pressReleases.length === 0 ? (
                  <p className="text-center text-gray-500">No press releases available</p>
                ) : (
                  <div className="space-y-6">
                    {pressReleases.map((release) => (
                      <Card key={release.id} className="hover:shadow-card transition-all duration-300">
                        <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-brand-dark">{release.title}</h4>
                            <p className="text-brand-gray">{release.description || "No description"}</p>
                            <p className="text-sm text-brand-gray mt-1">
                              Date: {new Date(release.date).toLocaleDateString()}
                            </p>
                          </div>
                          {release.document?.url ? (
                            <div className="flex gap-2 mt-2 md:mt-0">
                              <Button asChild className="bg-[#123F55] hover:bg-[#2CD2FF] text-white transition-colors duration-300 px-6 py-3 rounded">

                                <a href={release.document.url} target="_blank" rel="noopener noreferrer">View</a>
                              </Button>
                              <Button asChild className="bg-[#123F55] hover:bg-[#2CD2FF] text-white transition-colors duration-300 px-6 py-3 rounded">
                                <a href={release.document.url} download={release.document.name}>Download</a>
                              </Button>
                            </div>
                          ) : (
                            <span className="text-gray-400 mt-2 md:mt-0">No document available</span>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-brand-dark text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Connect with<span className="text-brand-white"> Investor Relations</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Stay informed about DigiPowerX developments, financial results, and investment opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#123F55] hover:bg-[#2CD2FF] text-white border border-white px-8 py-3 transition-colors duration-300 rounded"
              >
                Email Alerts
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-[#123F55] hover:text-[#FFFFFF] px-8 py-3 transition-colors duration-300 rounded"
              >
                Contact IR Team
              </Button>

            </div>
            <div className="mt-8 text-gray-400">
              <p>
                For investor inquiries:{" "}
                <a href="mailto:IR@digipowerx.com" className="text-brand-white hover:underline">
                  IR@digipowerx.com
                </a>
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default InvestorRelations;
