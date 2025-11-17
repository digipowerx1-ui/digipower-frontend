import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

interface DocumentItem {
  title: string;
  description: string;
  link: string;
}

export default function Document() {
  // Governance Documents
  const governanceDocuments: DocumentItem[] = [
    {
      title: "Code of Business Conduct and Ethics",
      description: "Our company code of conduct for employees and leadership.",
      link: "https://cdn.prod.website-files.com/66f727b0f2cf943df67f3121/671c292ecfdadc90273992ca_Code-of-Ethics-Digihost-Technology-Inc.pdf",
    },
    {
      title: "Disclosure and Confidentiality Policy",
      description: "Policies to ensure proper disclosure and confidentiality of information.",
      link: "https://cdn.prod.website-files.com/66f727b0f2cf943df67f3121/671c292a85ea2fd6d74bd46a_Disclosure-Policy-Digihost-Technology-Inc.pdf",
    },
  ];

  // Example: Board Policies section
  const boardPolicies: DocumentItem[] = [
    {
      title: "Board Meeting Guidelines",
      description: "Guidelines for board meetings and decision-making.",
      link: "/documents/board-meeting-guidelines.pdf",
    },
    {
      title: "Board Member Roles & Responsibilities",
      description: "Defines duties and responsibilities of board members.",
      link: "/documents/board-roles.pdf",
    },
  ];

  return (
    <div className="w-full bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* Navigation */}
      <Navigation />

      {/* Page Header */}
      <section className="py-20 text-center px-6 transition-colors duration-300">
        {/* Soft Background Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,200,255,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_top,rgba(0,200,255,0.15),transparent_70%)] pointer-events-none"></div>

        <h1 className="text-4xl md:text-5xl font-bold">
          <GradientText>Documents & Charters</GradientText>
        </h1>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
          Access all official governance documents, charters, and policies for DigiPowerX.
        </p>
        <div className="w-40 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full mx-auto mt-4 "></div>

      </section>

      {/* Governance Documents Section */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-8 transition-colors duration-300">
          Governance Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {governanceDocuments.map((doc, index) => (
            <Card
              key={index}
              className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow hover:shadow-lg dark:border-slate-700 transition-all duration-300"
            >
              <CardContent className="flex flex-col items-start">
                <FileDown className="w-10 h-10 text-blue-600 dark:text-cyan-400 mb-4 transition-colors duration-300" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{doc.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">{doc.description}</p>
                <a href={doc.link} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-[#01b4e5] hover:to-brand-navy text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all duration-300">
                    View Policies
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Board Policies Section */}
      {/* <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-8 transition-colors duration-300">
          Board Policies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {boardPolicies.map((doc, index) => (
            <Card
              key={index}
              className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow hover:shadow-lg dark:border-slate-700 transition-all duration-300"
            >
              <CardContent className="flex flex-col items-start">
                <FileDown className="w-10 h-10 text-blue-600 dark:text-cyan-400 mb-4 transition-colors duration-300" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{doc.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">{doc.description}</p>
                <a href={doc.link} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-[#01b4e5] hover:to-brand-navy text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all duration-300">
                    Download
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
