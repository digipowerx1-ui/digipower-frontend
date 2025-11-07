import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Users, Award, Target, TrendingUp, Mail, Linkedin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Leader {
  name: string;
  role: string;
  img: string;
  description: string;
  linkedIn?: string;
  email?: string;
  expertise: string[];
}

interface Stat {
  icon: typeof Users;
  value: string;
  label: string;
  color: string;
}

interface Committee {
  name: string;
  description: string;
  members: string[];
  icon: typeof Award;
  color: string;
}

export default function LeadershipCommittees() {
  const leaders: Leader[] = [
    {
      name: "Michel Amar",
      role: "Chief Executive Officer",
      img: "https://digipower-x-frontend.vercel.app/images/Michel.png",
      description:
        "Michel has over 20 years of experience leading tech companies and driving innovation in AI infrastructure and data center operations.",
      expertise: ["Strategic Planning", "AI Infrastructure", "Business Development"],
      linkedIn: "#",
      email: "michel@digipowerx.com",
    },
    {
      name: "Alec Amar",
      role: "Chief Technology Officer",
      img: "https://digipower-x-frontend.vercel.app/images/Alec%20Amar.png",
      description:
        "Alec specializes in software architecture and cutting-edge technology solutions, leading the development of our ARMS 200 platform.",
      expertise: ["Software Architecture", "Cloud Computing", "Innovation"],
      linkedIn: "#",
    },
    {
      name: "Paul Ciullo",
      role: "Chief Marketing Officer",
      img: "https://digipower-x-frontend.vercel.app/images/Paul%20Ciullo%20.png",
      description:
        "Paul leads marketing strategies with a focus on growth, branding, and customer engagement across global markets.",
      expertise: ["Brand Strategy", "Growth Marketing", "Customer Engagement"],
      linkedIn: "#",
    },
    {
      name: "Daniel Rotunno",
      role: "Chief Financial Officer",
      img: "https://digipower-x-frontend.vercel.app/images/Daniel%20Rotunno.png",
      description:
        "Daniel manages company finances and ensures sustainable growth through strategic financial planning and investor relations.",
      expertise: ["Financial Planning", "Investor Relations", "Risk Management"],
      linkedIn: "#",
    },
    {
      name: "Luke Marchiori",
      role: "Chief Operating Officer",
      img: "https://digipower-x-frontend.vercel.app/images/Luke%20Marchiori.png",
      description:
        "Luke oversees day-to-day operations and ensures smooth workflow across departments, optimizing efficiency and performance.",
      expertise: ["Operations Management", "Process Optimization", "Team Leadership"],
      linkedIn: "#",
    },
    {
      name: "Adam S. Rossman",
      role: "Chief Design Officer",
      img: "https://digipower-x-frontend.vercel.app/images/Adam%20S.png",
      description:
        "Adam crafts innovative and user-friendly designs for our products, ensuring exceptional user experiences across all platforms.",
      expertise: ["Product Design", "UX Strategy", "Design Systems"],
      linkedIn: "#",
    },
  ];

  const stats: Stat[] = [
    {
      icon: Users,
      value: "6",
      label: "Executive Leaders",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      value: "100+",
      label: "Years Combined Experience",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Target,
      value: "3",
      label: "Board Committees",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      value: "15+",
      label: "Industry Awards",
      color: "from-orange-500 to-red-500",
    },
  ];

  const committees: Committee[] = [
    {
      name: "Audit Committee",
      description: "Oversees financial reporting, internal controls, and compliance with regulatory requirements.",
      members: ["Daniel Rotunno (Chair)", "Michel Amar", "Independent Director"],
      icon: Award,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Compensation Committee",
      description: "Reviews and approves executive compensation, benefits, and equity incentive programs.",
      members: ["Michel Amar (Chair)", "Luke Marchiori", "Independent Director"],
      icon: Users,
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Nominating & Governance",
      description: "Identifies and recommends board candidates and oversees corporate governance practices.",
      members: ["Independent Director (Chair)", "Michel Amar", "Daniel Rotunno"],
      icon: Building2,
      color: "from-purple-500 to-pink-500",
    },
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
                <span className="text-brand-cyan font-semibold">{leaders.length} Executive Leaders</span>
              </motion.div>
              <motion.div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-brand-cyan/20 transition-colors duration-300">
                <span className="text-slate-600 dark:text-gray-300 font-medium transition-colors duration-300">Global Expertise</span>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold text-center mb-4">
              <GradientText>Leadership Excellence</GradientText>
            </h2>
            <p className="text-center text-slate-600 dark:text-gray-300 text-lg mb-16 max-w-2xl mx-auto transition-colors duration-300">
              A proven track record of innovation, growth, and industry leadership
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group p-8 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-500 text-center relative overflow-hidden"
                  >
                    {/* Animated background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 group-hover:from-brand-cyan/10 group-hover:to-brand-navy/10 transition-all duration-500" />

                    <div className="relative z-10">
                      <motion.div
                        className={`inline-flex p-4 mb-4 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <StatIcon className="w-8 h-8 text-white" />
                      </motion.div>
                      <p className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                      <p className="text-slate-600 dark:text-gray-300 font-medium transition-colors duration-300">{stat.label}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
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
                Seasoned leaders with deep expertise in technology, operations, and business strategy
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group h-full bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-500 p-8 relative overflow-hidden"
                >
                  {/* Animated background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 group-hover:from-brand-cyan/5 group-hover:to-brand-navy/5 transition-all duration-500" />

                  <div className="relative z-10">
                    {/* Profile Image */}
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      {/* Glowing background */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-navy to-brand-cyan blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Profile image */}
                      <motion.div
                        className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg mx-auto transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={leader.img}
                          alt={leader.name}
                          className="w-full h-full object-contain bg-white dark:bg-slate-700 transition-colors duration-300"
                        />
                      </motion.div>
                    </div>

                    {/* Name + Role */}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2 group-hover:text-brand-navy dark:group-hover:text-brand-cyan transition-colors duration-300">
                      {leader.name}
                    </h3>
                    <p className="text-brand-cyan font-semibold text-center mb-4">{leader.role}</p>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed text-center mb-4 transition-colors duration-300">
                      {leader.description}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {leader.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-brand-navy/10 to-brand-cyan/10 dark:from-brand-navy/20 dark:to-brand-cyan/20 rounded-full text-xs font-medium text-slate-700 dark:text-gray-300 transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      {leader.linkedIn && (
                        <motion.a
                          href={leader.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-gradient-to-r from-brand-navy to-brand-cyan rounded-lg hover:shadow-lg transition-shadow"
                        >
                          <Linkedin className="w-4 h-4 text-white" />
                        </motion.a>
                      )}
                      {leader.email && (
                        <motion.a
                          href={`mailto:${leader.email}`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-gradient-to-r from-brand-cyan to-brand-navy rounded-lg hover:shadow-lg transition-shadow"
                        >
                          <Mail className="w-4 h-4 text-white" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Board Committees Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <GradientText>Board Committees</GradientText>
              </h2>
              <p className="text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                Specialized committees ensuring strong governance and strategic oversight
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {committees.map((committee, index) => {
              const CommitteeIcon = committee.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group h-full bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-500 p-8 relative overflow-hidden"
                  >
                    {/* Animated background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 group-hover:from-brand-cyan/10 group-hover:to-brand-navy/10 transition-all duration-500" />

                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        className={`inline-flex p-4 mb-6 rounded-xl bg-gradient-to-br ${committee.color}`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CommitteeIcon className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Name */}
                      <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-brand-navy dark:group-hover:text-brand-cyan transition-colors duration-300">
                        {committee.name}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-4 transition-colors duration-300">
                        {committee.description}
                      </p>

                      {/* Members */}
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">
                          Committee Members
                        </p>
                        {committee.members.map((member, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2 flex-shrink-0" />
                            <p className="text-sm text-slate-700 dark:text-gray-300 transition-colors duration-300">{member}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-black text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block p-4 bg-white/10 dark:bg-white/5 rounded-2xl mb-6 backdrop-blur-sm transition-colors duration-300"
            >
              <Users className="w-12 h-12 text-brand-cyan" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team
            </h2>
            <p className="text-xl text-gray-300 dark:text-gray-200 mb-10 max-w-2xl mx-auto transition-colors duration-300">
              We're always looking for talented individuals to join our mission of transforming AI infrastructure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact-us"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="px-8 py-6 bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-brand-cyan hover:to-brand-navy text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  View Open Positions
                </Button>
              </motion.a>
              <motion.a
                href="/investor"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  Investor Relations
                </Button>
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
