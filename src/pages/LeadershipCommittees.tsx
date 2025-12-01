import { motion, AnimatePresence } from "framer-motion";
import { ComponentType, SVGProps, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Users, Award, Target, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Leader {
  name: string;
  role: string;
  img: string;
  description: string;
  linkedIn?: string;
  email?: string;
}




interface Committee {
  name: string;
  description: string;
  members: string[];
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  color?: string;
}

interface BoardMember {
  name: string;
  title: string;
  img: string;
  bio: string;
  linkedIn?: string;
  email?: string;
  committees: { name: string; role: string }[]; // e.g. { name: "Audit Committee", role: "Chair" }
}

export default function LeadershipCommittees() {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

const leaders: Leader[] = [
  {
    name: "Michel Amar",
    role: "Chief Executive Officer",
    img: "/michal.jpeg",
    description: "Michel Amar is a French-American businessman and entrepreneur known for his success in innovative technology, such as blockchain and electronics, as well as developing branded fashion. With a Bachelor's degree in accounting and business management, Michel has worked and consulted with some of the most famous international brands, playing a vital role in their profitability and continued relevance. In 2019, Michel partnered with Brookstone, a novelty retailer, in developing exclusive, technologically advanced products for their consumer electronics market.",
    linkedIn: "#",
    email: "michel@digipowerx.com",
  },
  {
    name: "Alec Amar",
    role: "President",
    img: "/alec.jpeg",
    description: "Mr. Amar is an entrepreneur and infrastructure executive with deep experience in energy, high-density data-center development, and advanced digital infrastructure. Under Mr. Amar's leadership, DigiPowerX has expanded into multiple U.S. markets with a growing portfolio of high-power data-center properties, including the development of a Tier III campus in Columbiana, Alabama; the modernization and repurposing of critical-power infrastructure in New York; and a national pipeline tied to power-station redevelopment, modular AI-ready facilities, and long-term energy-backed compute sites.\n\nMr. Amar guided the creation of DigiPowerX's proprietary ARMS 200 modular Tier III data-center system, engineered specifically for ultra-dense GPU clusters such as Nvidia B200/B300 deployments. His work bridges the gap between power system design, mission-critical facility engineering, and the rapidly accelerating demands of AI and high-performance computing.",
    linkedIn: "#",
  },
  {
    name: "Paul Ciullo",
    role: "Chief Financial Officer",
    img: "/Paul.jpeg",
    description: "Paul Ciullo serves as Chief Financial Officer at DigiPowerX, bringing extensive experience in financial management and corporate strategy to the executive team.",
    linkedIn: "#",
  },
  {
    name: "Daniel Rotunno",
    role: "VP of Operations",
    img: "/danial.jpeg",
    description: "Daniel Rotunno serves as VP of Operations at DigiPowerX, overseeing the company's operational excellence and ensuring efficient execution of strategic initiatives across all business units.",
    linkedIn: "#",
  },
  {
    name: "Luke Marchiori",
    role: "Chief Renewable Energy Officer",
    img: "/luke.jpeg",
    description: "Luke Marchiori serves as Chief Renewable Energy Officer at DigiPowerX, leading the company's sustainable energy initiatives and driving the integration of renewable power solutions into data center operations.",
    linkedIn: "#",
  },
  {
    name: "Edward Karr",
    role: "Capital Markets and Investor Relations Advisor",
    img: "/edward.png",
    description: "Edward Karr is an international entrepreneur and founder of several investment management companies. Mr. Karr has more than 30 years of capital markets experience as an executive manager, financial analyst, money manager and investor. Mr. Karr was the founder, former President, CEO and Executive Chairman of U.S. Gold Corp. He was a former Director and Chair of the Audit Committee of Levon Resources, until its merger with Discovery Metals. Mr. Karr previously served on the boards of numerous publicly traded companies including Dataram, Inc., Pershing Gold Corp., PolarityTE, Inc. and Spherix Inc.",
    linkedIn: "#",
  },
  {
    name: "Eddie Cloud",
    role: "Infrastructure and Development Lead",
    img: "/eddie.jpeg",
    description: "Eddie Cloud serves as an Infrastructure and Development Lead for DigiPowerX, overseeing large-scale site development, power-delivery coordination, and the deployment of high-density AI compute facilities. With 23 years of experience in electrical construction, power systems, and industrial infrastructure, Eddie manages end-to-end execution across utility negotiations, modular facility design, construction oversight, and Tier-3 secure-lot infrastructure.\n\nHe is recognized for his hands-on leadership style, ability to move projects from concept to operational readiness quickly, and deep experience with multi-MW power systems, cooling architectures, and UL/NRTL compliance. Eddie works directly with engineering teams, utilities, and municipal partners to ensure DigiPowerX delivers reliable, scalable AI infrastructure for enterprise clients.",
    linkedIn: "#",
  },
  {
    name: "David Harley",
    role: "Director of Manufacturing, Operations & Systems Integration",
    img: "/david.jpeg",
    description: "Mr. Harley is a veteran engineering, manufacturing, and operations executive with nearly 40 years of experience driving performance, systems integration, infrastructure reliability, and lean transformation across aerospace, defense, power systems, and advanced manufacturing environments. His extensive technical leadership spans high-reliability environments supporting NASA, Blue Origin, BAE Systems, U.S. defense platforms, and high-voltage industrial operations.\n\nAt DigiPowerX, Mr. Harley oversees mission-critical infrastructure operations at the North Tonawanda facility, including high-voltage electrical distribution, uptime optimization, and the operational execution required to support large-scale AI and data-center workloads. He leads site technicians, contractors, and operational partners while driving KPI reporting, maintenance programs, SOP execution, and 24/7 incident response.\n\nAt Blue Origin, Mr. Harley played a pivotal role in the production of avionics systems for NASA's MK1 and MK2 Lunar Lander programs, supporting the next generation of U.S. lunar exploration. He led avionics manufacturing engineering for spacecraft harnessing, fluid systems, and electromechanical assemblies; conducted engineering design-release reviews to ensure aerospace-grade quality, reliability, and system integrity; and provided mentorship, technical training, and daily support to engineering and production teams.\n\nHis Blue Origin experience brings DigiPowerX a rare level of mission-critical assembly discipline, directly applicable to high-density power systems, advanced electrical integration, and Tier-level data-center infrastructure.",
    linkedIn: "#",
  },
];


  


  // NEW: Board of Directors array (one-per-row layout)
const boardMembers: BoardMember[] = [
  {
    name: "Michel Amar",
    title: "Chairman ",
    img: "/michal.jpeg",
    bio:
      "Michel Amar is a French-American businessman and entrepreneur known for his success in innovative technology, such as blockchain and electronics, as well as developing branded fashion. With a Bachelor's degree in accounting and business management, Michel has worked and consulted with some of the most famous international brands, playing a vital role in their profitability and continued relevance. In 2019, Michel partnered with Brookstone, a novelty retailer, in developing exclusive, technologically advanced products for their consumer electronics market.",
committees: [
  { name: "Disclosure Committee", role: "Chair" },
  { name: "Governance and Nominating Committee", role: "Member" },
],

  },

  {
    name: "Alec Amar",
    title: "Director",
    img: "/alec.jpeg",
    bio:
      "Mr. Amar is an entrepreneur and infrastructure executive with deep experience in energy, high-density data-center development, and advanced digital infrastructure. Under Mr. Amar's leadership, DigiPowerX has expanded into multiple U.S. markets with a growing portfolio of high-power data-center properties, including the development of a Tier III campus in Columbiana, Alabama; the modernization and repurposing of critical-power infrastructure in New York; and a national pipeline tied to power-station redevelopment, modular AI-ready facilities, and long-term energy-backed compute sites.\n\nMr. Amar guided the creation of DigiPowerX's proprietary ARMS 200 modular Tier III data-center system, engineered specifically for ultra-dense GPU clusters such as Nvidia B200/B300 deployments. His work bridges the gap between power system design, mission-critical facility engineering, and the rapidly accelerating demands of AI and high-performance computing.\n\nAn experienced operator with roots in entrepreneurship, Mr. Amar previously built and scaled multiple ventures across wholesale distribution, logistics, manufacturing, and retail channels. His background gives DigiPowerX a unique blend of strategic vision and hands-on execution—allowing the company to move infrastructure projects from conception to deployment with uncommon speed and efficiency.\n\nAt DigiPowerX, Mr. Amar focuses on power acquisition, large-scale project execution, capital strategy, and forging the partnerships required to build a national footprint in AI-driven digital infrastructure. His vision centers on the convergence of clean power, high-density compute, and sustainable next-generation data centers, positioning DigiPowerX to lead the transformation of AI infrastructure in the United States.",
    committees: [
      { name: "Compensation Committee", role: "Member" },
    ],
  },

  {
    name: "Dennis Elsenbeck",
    title: "Director",
    img: "/dennis.jpeg",
    bio:
      "Mr. Elsenbeck provides consulting services on energy-related opportunities as Head of Energy and Sustainability at Phillips Lytle LLP and as owner of ElsEnergy LLC. With nearly 30 years of leadership at a major U.S. utility and roles as President and Chief Sustainability Officer at Viridi Parente, he brings expertise in long-term energy policy, markets, and infrastructure.\n\nHe advises clients on due diligence, regulatory compliance, procurement strategies, utility negotiations, economic incentives, and resource planning. He is a member of Aion 1901 LLC and HM 1901 LLC, focusing on revitalizing disadvantaged communities through energy infrastructure.\n\nHe serves on New York's Climate Action Council, helping develop the Scoping Document for the state's Climate Leadership and Community Protection Act. He is Board Chair for the Northland Workforce Training Center, a Board Member for the Buffalo Urban Development Corporation, and a member of the University at Buffalo School of Engineering Dean's Council. He holds degrees in Industrial Engineering Technology, an MBA, and a Master's in Engineering.\n\nMr. Elsenbeck is a recognized expert and lecturer in the energy field.",
    committees: []
  },

  {
    name: "Gerard Rotonda",
    title: "Director",
    img: "/gerard.jpeg",
    bio:
      "Mr. Rotonda was the Chief Financial Officer and Executive Committee Member for Deutsche Bank Wealth Management Americas from 2011 through 2018. He has over 30 years of experience in business development, financial analysis, and real estate investment as Co-Founder and Partner at MMR Development. He has also served in leadership roles at MasterCard, Credit Suisse, and Citigroup. Mr. Rotonda holds a BSBA in Accounting and an MBA from Boston University.",
    committees: [
      { name: "Audit Committee", role: "Chair" },
      { name: "Disclosure Committee", role: "Member" },
      { name: "Compensation Committee", role: "Member" },
    ],
  },

  {
    name: "Adam S. Rossman",
    title: "Director",
    img: "/adam.jpeg",
    bio:
      "Mr. Rossman is a business and real estate attorney.  He has been a member of the California Bar since 1995.  Mr. Rossman has handled transactions throughout the United States relating to commercial real estate and trademark licensing.  Mr. Rossman maintains offices in Beverly Hills, CA.  Mr. Rossman received his JD from Loyola Law School, Los Angeles in 1994, a MA in Rhetoric in 1990 and a BA in Rhetoric in 1988 both from University of California at Berkeley",
  committees: [
  { name: "Audit Committee", role: "Member" },
  { name: "Disclosure Committee", role: "Member" },
  { name: "Compensation Committee", role: "Chair" },
  { name: "Governance and Nominating Committee", role: "Chair" },
],

  },

 {
  name: "Ajay Gupta",
  title: "Director",
  img: "/Ajay.jpeg",
  bio:
    "Mr. Gupta is a seasoned wealth management executive, investor, and family office principal known for his leadership in building, scaling, and advising some of the most respected financial organizations in the United States. He currently serves as Principal of Robbins Gupta Holdings, the exclusive family office for Tony Robbins and the Gupta family.\n\nAfter founding and scaling Gupta Wealth Management into one of the industry's premier firms, Mr. Gupta merged with Creative Planning, a $390 billion registered investment advisor, where he served as Chief Investment Strategist before retiring in 2020 following the sale of his equity stake to private equity investors.\n\nHis expertise led to a featured role in Tony Robbins' #1 New York Times bestseller Money: Master the Game, where he and Robbins interviewed 50 of the world's top financial minds, including Ray Dalio, Warren Buffett, Carl Icahn, and Charles Schwab — a collective 150 hours of insight Mr. Gupta calls among the most transformative experiences of his 25-year career.\n\nIn addition to his new role with DigiPowerX, Mr. Gupta serves on the boards of CAZ Investments, a $10 billion alternative investment firm; the Tony Robbins Foundation; the Baptist Health Foundation; and The Chopra Foundation, where he previously served as President and continues to collaborate closely with his longtime friend and founder, Dr. Deepak Chopra.\n\nMr. Gupta holds a Bachelor of Commerce in Finance from Concordia University and has completed advanced executive programs through the Wharton School of Business, the University of Chicago Booth School of Business, and Harvard Business School.\n\nMr. Gupta's exceptional track record in wealth management, family office strategy, and alternative investments makes him an outstanding addition to the Board. His strategic insight and global relationships are invaluable as DigiPowerX accelerates its mission to lead the intersection of clean power, AI, and digital infrastructure.\n\nDigiPowerX is uniquely positioned at the convergence of two powerful trends — AI compute growth and the global shift toward energy efficiency. Mr. Gupta is honored to join the Board and support the company's vision of building transformative, sustainable technology infrastructure.\n\nThrough the Ajay Gupta Family Foundation, Mr. Gupta and his family actively support global philanthropic initiatives focused on education, health, and empowerment.",
  committees: []
},

// {
//   name: "Edward Karr",
//   title: "Director",
//   img: "/edward.jpeg",
//   bio:
//     "Edward Karr is an international entrepreneur and founder of several investment management companies. Mr. Karr has more than 30 years of capital markets experience as an executive manager, financial analyst, money manager and investor. Mr. Karr was the founder, former President, CEO and Executive Chairman of U.S. Gold Corp. He was a former Director and Chair of the Audit Committee of Levon Resources, until its merger with Discovery Metals. Mr. Karr previously served on the boards of numerous publicly traded companies including Dataram, Inc., Pershing Gold Corp., PolarityTE, Inc. and Spherix Inc. Mr. Karr is a prior board member and past President of the American International Club of Geneva and Chairman of Republican's Overseas Switzerland. He is a frequent contributor to the financial press. Mr. Karr previously worked for Prudential Securities in the United States. Before his entry into the financial services arena, Mr. Karr was affiliated with the United States Antarctic Program and spent thirteen consecutive months working in the Antarctic, receiving the Antarctic Service Medal for winter over contributions of courage, sacrifice and devotion.",
//   committees: []
// },

];



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 scroll-smooth transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden transition-colors duration-300">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-brand-cyan/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-72 h-72 bg-brand-navy/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeIn delay={0.2}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg mb-6 transition-colors duration-300"
            >
              <Users className="w-12 h-12 text-brand-cyan" />
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <GradientText>Leadership & Committees</GradientText>
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="w-40 h-1.5 bg-gradient-to-r from-brand-navy to-brand-cyan rounded-full mx-auto mb-8" />
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 transition-colors duration-300">
              Meet the experienced executives driving DigiPowerX's vision of revolutionizing AI infrastructure and data center operations
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-brand-cyan/20 transition-colors duration-300">
                <span className="text-brand-cyan font-semibold"> Executive Leaders</span>
              </motion.div>
              <motion.div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-brand-cyan/20 transition-colors duration-300">
                <span className="text-slate-600 dark:text-gray-300 font-medium transition-colors duration-300">Board of Directors</span>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

    

      {/* Leadership Team Section */}
 <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
  <div className="max-w-7xl mx-auto">
    <FadeIn>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          <GradientText>Executive Team</GradientText>
        </h2>
        <p className="text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
          Seasoned leaders with deep expertise in technology, operations, and business strategy.
        </p>
      </div>
    </FadeIn>

    <StaggerContainer className="flex flex-wrap justify-center gap-10">
      {leaders.map((leader, index) => (
        <StaggerItem key={index} className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.75rem)]">
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedLeader(leader)}
            className="group h-full bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 relative overflow-hidden cursor-pointer"
          >
            {/* Hover Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 group-hover:from-brand-cyan/10 group-hover:to-brand-navy/10 transition-all duration-500" />

            <div className="relative z-10">
              {/* Profile Image */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-navy to-brand-cyan blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                  className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl mx-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-full h-full object-cover bg-white dark:bg-slate-700"
                  />
                </motion.div>
              </div>

              {/* Name + Role */}
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-1 group-hover:text-brand-navy dark:group-hover:text-brand-cyan transition-colors duration-300">
                {leader.name}
              </h3>

              <p className="text-brand-cyan font-semibold text-center mb-3">
                {leader.role}
              </p>

              {/* Click to view bio hint */}
              <p className="text-slate-400 dark:text-gray-500 text-xs text-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to view bio
              </p>
            </div>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerContainer>

    {/* Bio Modal */}
    <AnimatePresence>
      {selectedLeader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedLeader(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] lg:h-[540px] overflow-y-auto relative"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedLeader(null)}
              className="sticky top-4 float-right mr-4 mt-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-gray-300" />
            </button>

            <div className="p-8 pt-2">
              {/* Profile Image */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-navy to-brand-cyan blur-2xl opacity-40"
                />
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl mx-auto">
                  <img
                    src={selectedLeader.img}
                    alt={selectedLeader.name}
                    className="w-full h-full object-cover bg-white dark:bg-slate-700"
                  />
                </div>
              </div>

              {/* Name + Role */}
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-2">
                {selectedLeader.name}
              </h3>

              <p className="text-brand-cyan font-semibold text-center text-lg mb-6">
                {selectedLeader.role}
              </p>

              {/* Divider */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent mb-6" />

              {/* Bio */}
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {selectedLeader.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</section>


      {/* NEW Board of Directors Section (one-per-row) */}
  {/* ===================== BOARD OF DIRECTORS ===================== */}
<section className="py-24 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
  <div className="max-w-7xl mx-auto">

    <FadeIn>
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          <GradientText>Board of Directors</GradientText>
        </h2>

        <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          A distinguished board providing strategic guidance, corporate governance, and long-term stewardship.
        </p>
      </div>
    </FadeIn>

    <div className="space-y-12">
      {boardMembers.map((member, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -4, scale: 1.01 }}
          className="group relative overflow-hidden rounded-3xl border border-slate-200 
                     dark:border-slate-800 bg-white dark:bg-slate-900 
                     shadow-[0_6px_25px_-4px_rgba(0,0,0,0.08)] 
                     hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.14)] 
                     transition-all duration-500 p-10"
        >

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 
                          group-hover:from-brand-cyan/10 group-hover:to-brand-navy/10 
                          transition-all duration-500" />

          <div className="relative z-10 flex flex-col gap-6">

            {/* Name + Title */}
            <div className="border-l-4 border-brand-cyan pl-4">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-snug">
                {member.name}
              </h3>

              <p className="text-brand-cyan font-semibold text-lg mt-1 tracking-wide">
                {member.title}
              </p>
            </div>

            {/* BIO — Hidden until hover */}
            <div
              className="opacity-0 max-h-0 overflow-hidden 
                         group-hover:opacity-100 group-hover:max-h-[1600px] 
                         transition-all duration-700 ease-in-out"
            >
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-[16.5px] tracking-[0.2px] whitespace-pre-line">
                {member.bio}
              </p>

              {/* Divider */}
              <div className="h-[1px] bg-gradient-to-r from-transparent 
                              via-slate-300/40 dark:via-slate-600/40 
                              to-transparent my-4" />

              {/* Committees */}
              {member.committees && member.committees.length > 0 && (
                <div className="flex flex-wrap gap-3 items-center">
                  {member.committees.map((c, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 rounded-full text-sm font-medium 
                                 bg-slate-100 dark:bg-slate-800 text-slate-700 
                                 dark:text-gray-300 shadow-sm border border-slate-200 
                                 dark:border-slate-700 hover:shadow-md transition-all"
                    >
                      <span className="text-brand-cyan font-semibold">{c.role}</span>
                      {" • "}
                      {c.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
        </motion.div>
      ))}
    </div>

  </div>
</section>





 <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">
        <GradientText>Connect With Us</GradientText>
      </h2>
      <p className="text-lg text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
        Whether you're an investor, partner, or community member, we're here to support you.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

      {/* ====================== CARD 1 — CONTACT US ====================== */}
  <motion.div
  whileHover={{ y: -6, scale: 1.01 }}
  className="group rounded-2xl border border-gray-200 dark:border-slate-700 
             shadow-md hover:shadow-2xl transition-all duration-500 
             p-10 relative overflow-hidden
             bg-gradient-to-br from-[#0A1A2F] via-[#102C45] to-[#1A4B6E]"
>
  {/* Hover overlay */}
  <div
    className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 
               group-hover:from-brand-cyan/10 group-hover:to-brand-navy/10
               transition-all duration-500"
  />

  <div className="relative z-10 flex flex-col space-y-4">
    <h3 className="text-2xl font-bold text-white">
      Contact Us
    </h3>

    <p className="text-gray-300 leading-relaxed">
      We value your engagement and are committed to fostering strong relationships with our stakeholders.
    </p>

    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href="/contact-us"
      className="inline-block px-6 py-3 rounded-full font-semibold 
                bg-gradient-to-r from-brand-navy to-brand-cyan 
                text-white shadow-md hover:shadow-xl transition-all duration-300 w-fit"
    >
      Get in touch
    </motion.a>
  </div>
</motion.div>


      {/* =================== CARD 2 — EMAIL ALERTS SIGNUP ================== */}
<motion.div
  whileHover={{ y: -6, scale: 1.01 }}
  className="group rounded-2xl border border-gray-200 dark:border-slate-700 
             shadow-md hover:shadow-2xl transition-all duration-500 
             p-10 relative overflow-hidden
             bg-gradient-to-br from-[#0A1A2F] via-[#102C45] to-[#1A4B6E]"
>
  <div
    className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 
               group-hover:from-brand-cyan/10 group-hover:to-brand-navy/10
               transition-all duration-500"
  />

  <div className="relative z-10 flex flex-col space-y-4">
    <h3 className="text-2xl font-bold text-white">
      Sign up for Email Alerts
    </h3>

    <p className="text-gray-300 leading-relaxed">
      Receive updates in real-time about company activities and stay up to date with business developments.
    </p>

    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href="/email-alerts"
      className="inline-block px-6 py-3 rounded-full font-semibold 
                bg-gradient-to-r from-brand-cyan to-brand-navy text-white 
                shadow-md hover:shadow-xl transition-all duration-300 w-fit"
    >
      Sign Up
    </motion.a>
  </div>
</motion.div>


    </div>
  </div>
</section>


      <Footer />
    </div>
  );
}
