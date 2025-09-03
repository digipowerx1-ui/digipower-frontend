import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Linkedin, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Leadership = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedLeader, setSelectedLeader] = useState<any | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const leadership = [
    {
      name: "Michel Amar, Chairman",
      position: "Chief Executive Officer & Chairman",
      experience: "20+ years",
      background:
        "Michel Amar is a French-American businessman and entrepreneur known for his success in innovative technology, such as blockchain and electronics, as well as developing branded fashion. With a Bachelor’s degree in accounting and business management, Michel has worked and consulted with some of the most famous international brands, playing a vital role in their profitability and continued relevance. In 2019, Michel partnered with Brookstone, a novelty retailer, in developing exclusive, technologically advanced products for their consumer electronics market.",
      committeeRoles: [
        "Chair of the Disclosure Committee",
        "Member of the Governance and Nominating Committee",
      ],
      featured: true,
    },
    {
      name: "Alec Amar, Director",
      position: "Chief Financial Officer",
      experience: "15+ years",
      background:
        "Alec Amar is an entrepreneur who has achieved success in both product development and licensing, as well as blockchain solutions. After graduating from the University of Southern California, with a degree in economics and digital entrepreneurship, Alec devised and headed a blockchain operation, building out highly efficient and productive mining facilities. In addition to blockchain success, Alec’s product licensing company, MAT, a versatile R&D incubator, has partnered with notable brands such as Brookstone, in developing innovative electronics. As one of the sole licensees of Brookstone, Alec is actively curating a collection of intelligent, proprietary consumer electronics.",
      committeeRoles: ["Member of the Compensation Committee"],
      featured: false,
    },
    {
      name: "Adam S. Rossman, Director",
      position: "Chief Technology Officer",
      experience: "18+ years",
      background:
        "Mr. Rossman is a business and real estate attorney. He has been a member of the California Bar since 1995. Mr. Rossman has handled transactions throughout the United States relating to commercial real estate and trademark licensing. Mr. Rossman maintains offices in Beverly Hills, CA. Mr. Rossman received his JD from Loyola Law School, Los Angeles in 1994, a MA in Rhetoric in 1990 and a BA in Rhetoric in 1988 both from University of California at Berkeley.",
      committeeRoles: [
        "Member of the Audit Committee",
        "Member of the Disclosure Committee",
        "Chair of the Compensation Committee",
        "Chair of the Governance and Nominating Committee",
      ],
      featured: false,
    },
    {
      name: "Emily Watson",
      position: "Chief Operating Officer",
      experience: "16+ years",
      background:
        "Former Operations Director at NextEra Energy, expert in large-scale energy project execution and regulatory compliance.",
      committeeRoles: [
        "Operations Management",
        "Project Execution",
        "Regulatory Affairs",
      ],
      featured: false,
    },
    {
      name: "Gerard Rotanda, Director",
      position: "Chief Operating Officer",
      experience: "16+ years",
      background:
        "Mr. Rotonda was the Chief Financial Officer and Executive Committee Member for Deutsche Bank Wealth, Management Americas from 2011 through 2018. Mr. Rotonda has over 30 years of experience in business development and financial analysis, most recently as Co-Founder and Partner at MMR Development, a real estate company which develops or repositions office, residential and hotel properties. Mr. Rotonda has also been Senior Business Leader and Director Strategy and Planning at MasterCard Incorporated, Director Strategic Planning at Credit Suisse Group, and Vice President Investment Finance and Structured Lending at Citigroup. Mr. Rotonda holds a BSBA in Accounting and MBA from Boston University.",
      committeeRoles: [
        "Chair of the Audit Committee",
        "Member of the Disclosure Committee",
        "Member of the Compensation Committee",
      ],
      featured: false,
    },
    {
      name: "Dennis Elsenbeck, Director",
      position: "Chief Operating Officer",
      experience: "16+ years",
      background:
        "Mr. Elsenbeck currently provides consulting services on a broad range of energy-related opportunities encompassing a forward view of supply, distribution and demand options as Head of Energy and Sustainability with Phillips Lytle LLP, as well as, the Sole Proprietor of his own firm, ElsEnergy LLC. In his leadership role with a major U.S. utility for nearly 30 years, as well as, recent roles as President and Chief Sustainability Officer with the battery storage start-up Company, Viridi Parente, he brings insight, analytics and business perspectives on long-term policies and the economic landscape.",
      committeeRoles: [
        "Chair of the Audit Committee",
        "Member of the Disclosure Committee",
        "Member of the Compensation Committee",
      ],
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-b from-background via-card/30 to-background overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-primary/30 rounded-lg rotate-45 animate-float" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-electric bg-clip-text text-transparent animate-slide-in-left">
              Leadership & Committees
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-in-right">
              Meet the experienced team driving DigiPower X's innovative energy
              solutions
            </p>
          </div>
        </div>
      </section>

      {/* Executive Leadership */}
      <section ref={sectionRef} className="py-20">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-primary">
              Executive Leadership
            </h2>
            <p className="text-muted-foreground text-lg">
              Proven leaders with deep industry expertise
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {leadership.map((leader, index) => (
              <Card
                key={index}
                onClick={() => setSelectedLeader(leader)}
                className={`cursor-pointer group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-glow ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${leader.featured ? "border-primary/30 bg-gradient-glow lg:col-span-2" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-primary/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle
                          className={`group-hover:text-primary transition-colors duration-300 ${
                            leader.featured ? "text-2xl" : "text-xl"
                          }`}
                        >
                          {leader.name}
                        </CardTitle>
                        {leader.featured && (
                          <Badge className="bg-gradient-electric text-white">
                            CEO
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-lg font-medium text-primary mb-2">
                        {leader.position}
                      </CardDescription>
                      <Badge variant="outline" className="mb-4">
                        {leader.experience}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Leader Details */}
      <Dialog open={!!selectedLeader} onOpenChange={() => setSelectedLeader(null)}>
        <DialogContent className="max-w-2xl">
          {selectedLeader && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedLeader.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedLeader.position} • {selectedLeader.experience}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <p className="text-muted-foreground">{selectedLeader.background}</p>

                {selectedLeader.committeeRoles?.length > 0 && (
                  <div>
                    <p className="font-semibold mb-2">Committee Role(s):</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedLeader.committeeRoles.map((role: string, i: number) => (
                        <li key={i}>{role}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-4 mt-6">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Leadership;
