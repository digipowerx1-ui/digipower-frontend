import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp, DollarSign, FileText, Calendar, Users, BarChart3 } from "lucide-react";
import { Helmet } from "react-helmet-async";

const InvestorRelations = () => {
  const stockData = {
    price: "$2.37",
    change: "+$0.17",
    volume: "1,287,617",
    marketCap: "$45.2M",
    revenue: "$37.0M"
  };

  const keyMetrics = [
    { label: "Total Revenue (FY 2024)", value: "$37.0M", icon: DollarSign },
    { label: "Mining Sites", value: "3", icon: BarChart3 },
    { label: "Miners Under Management", value: "11.8k+", icon: Users },
    { label: "Electrical Infrastructure", value: "100 MW", icon: TrendingUp }
  ];

  const milestones = [
    {
      date: "February 2025",
      title: "Launched US Data Centers, Inc.",
      description: "Strategic expansion into data center infrastructure"
    },
    {
      date: "Q4 2024",
      title: "Record Revenue Achievement",
      description: "Achieved $37M in fiscal year 2024 revenue"
    },
    {
      date: "Q3 2024", 
      title: "Infrastructure Expansion",
      description: "Completed 25MW facility expansion in Alabama"
    },
    {
      date: "Q2 2024",
      title: "Mining Operations Scale",
      description: "Reached 11.8k+ miners under management"
    }
  ];

  const presentations = [
    {
      title: "Company Overview Presentation",
      date: "February 2025",
      type: "Investor Deck",
      description: "Comprehensive overview of DigiPowerX strategy and operations"
    },
    {
      title: "Q4 2024 Earnings Call",
      date: "January 2025", 
      type: "Earnings",
      description: "Fourth quarter 2024 financial results and outlook"
    },
    {
      title: "Infrastructure Investment Thesis",
      date: "December 2024",
      type: "Strategy",
      description: "Long-term growth strategy and market opportunities"
    }
  ];

  return (
    <>
      <Helmet>
        <title>DigiPowerX Investor Relations - Stock Information & Financial Data</title>
        <meta name="description" content="Access DigiPowerX investor information including stock data, financial reports, presentations, and SEC filings. Current stock price, revenue, and growth metrics." />
        <meta name="keywords" content="DGXX stock, investor relations, financial reports, earnings, SEC filings, DigiPowerX investment" />
        <link rel="canonical" href="/investor-relations" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-24 px-4 bg-gradient-to-r from-brand-dark to-brand-blue overflow-hidden">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/800')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Investor
                <span className="text-brand-orange"> Relations</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 animate-slide-up animation-delay-150">
                Investing in the future of energy infrastructure and digital economy growth
              </p>
              <div className="flex flex-wrap gap-4 justify-center animate-bounce-in animation-delay-300">
                <Badge className="bg-brand-orange text-white px-4 py-2 text-lg">NASDAQ: DGXX</Badge>
                <Badge className="bg-white text-brand-dark px-4 py-2 text-lg">{stockData.price}</Badge>
                <Badge className="bg-brand-success text-white px-4 py-2 text-lg">{stockData.change}</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Stock Information */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">Stock Performance</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                Real-Time Market Data
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              <Card className="text-center p-6 hover:shadow-card transition-all duration-300">
                <CardContent>
                  <div className="text-3xl font-bold text-brand-orange mb-2">{stockData.price}</div>
                  <div className="text-sm text-brand-gray">Current Stock Price</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-card transition-all duration-300">
                <CardContent>
                  <div className="text-3xl font-bold text-brand-success mb-2">{stockData.change}</div>
                  <div className="text-sm text-brand-gray">Daily Change</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-card transition-all duration-300">
                <CardContent>
                  <div className="text-3xl font-bold text-brand-dark mb-2">{stockData.volume}</div>
                  <div className="text-sm text-brand-gray">Volume</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-card transition-all duration-300">
                <CardContent>
                  <div className="text-3xl font-bold text-brand-blue mb-2">{stockData.marketCap}</div>
                  <div className="text-sm text-brand-gray">Market Cap</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-card transition-all duration-300">
                <CardContent>
                  <div className="text-3xl font-bold text-brand-orange mb-2">{stockData.revenue}</div>
                  <div className="text-sm text-brand-gray">FY 2024 Revenue</div>
                </CardContent>
              </Card>
            </div>

            {/* Stock Chart Placeholder */}
            <Card className="p-8 mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-brand-dark">Stock Performance Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-brand-light-gray rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-brand-orange mx-auto mb-4" />
                    <p className="text-brand-gray">Interactive stock chart will be integrated here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-20 px-4 bg-brand-light-gray">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">Key Metrics</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                Financial & Operational Highlights
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyMetrics.map((metric, index) => (
                <Card 
                  key={metric.label} 
                  className="p-6 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-2 group animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent>
                    <metric.icon className="h-12 w-12 text-brand-orange mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
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
            <div className="text-center mb-16">
              <h2 className="text-sm text-brand-orange uppercase tracking-wide mb-4">Investor Resources</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                Financial Information & Reports
              </h3>
            </div>
            
            <Tabs defaultValue="presentations" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="presentations">Presentations</TabsTrigger>
                <TabsTrigger value="filings">SEC Filings</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="presentations">
                <div className="space-y-6">
                  {presentations.map((presentation, index) => (
                    <Card key={presentation.title} className="hover:shadow-card transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-xl font-bold text-brand-dark">{presentation.title}</h4>
                              <Badge variant="outline" className="text-brand-orange border-brand-orange">
                                {presentation.type}
                              </Badge>
                            </div>
                            <p className="text-brand-gray mb-2">{presentation.description}</p>
                            <div className="flex items-center text-sm text-brand-gray">
                              <Calendar className="h-4 w-4 mr-2" />
                              {presentation.date}
                            </div>
                          </div>
                          <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white">
                            <FileText className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="filings">
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="h-16 w-16 text-brand-orange mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-brand-dark mb-4">SEC Filings</h4>
                    <p className="text-brand-gray mb-6">
                      Access our complete SEC filing history including 10-K, 10-Q, 8-K, and proxy statements
                    </p>
                    <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white">
                      View All Filings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="milestones">
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <Card key={milestone.title} className="hover:shadow-card transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-brand-orange font-medium mb-1">{milestone.date}</div>
                            <h4 className="text-xl font-bold text-brand-dark mb-2">{milestone.title}</h4>
                            <p className="text-brand-gray">{milestone.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-brand-dark text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Connect with
              <span className="text-brand-orange"> Investor Relations</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Stay informed about DigiPowerX developments, financial results, and investment opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-3"
              >
                Email Alerts
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-brand-dark px-8 py-3"
              >
                Contact IR Team
              </Button>
            </div>
            <div className="mt-8 text-gray-400">
              <p>For investor inquiries: <a href="mailto:IR@digipowerx.com" className="text-brand-orange hover:underline">IR@digipowerx.com</a></p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default InvestorRelations;