import { motion } from 'framer-motion';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Download, ArrowRight, Calendar, Video, FileText, Clock, MapPin, Users } from 'lucide-react';
import GradientText from "@/components/GradientText";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Presentation {
  id: number;
  date: string;
  title: string;
  description: string;
  type: 'Investor Presentation' | 'Earnings Call' | 'Webcast' | 'Annual Report';
  downloadLink: string;
  thumbnail?: string;
}

interface UpcomingEvent {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'Webcast' | 'Conference' | 'Earnings Call';
  registrationLink?: string;
}

export default function PresentationsEvents() {
  const presentations: Presentation[] = [
    {
      id: 1,
      date: 'October 8, 2025',
      title: 'Investor Presentation – Q4 2025',
      description: 'A detailed report outlining our AI infrastructure growth, expansion roadmap, and financial outlook for Q4 2025.',
      type: 'Investor Presentation',
      downloadLink: 'https://cdn.prod.website-files.com/66f727b0f2cf943df67f317e/68e859482fb517e9da2babdc_DigiPower%20X%20Deck%20October%202025.pdf',
      thumbnail: 'https://cdn.prod.website-files.com/66f727b0f2cf943df67f317e/68e859410eec6662078e2426_Screenshot%202025-10-09%20at%208.54.21%E2%80%AFPM.png',
    },
    {
      id: 2,
      date: 'September 15, 2025',
      title: 'Q3 2025 Earnings Call Presentation',
      description: 'Third quarter financial results, strategic initiatives update, and market outlook discussion.',
      type: 'Earnings Call',
      downloadLink: '#',
    },
    {
      id: 3,
      date: 'August 20, 2025',
      title: 'ARMS 200 Technology Deep Dive',
      description: 'Technical presentation showcasing the next generation of our modular AI infrastructure solutions.',
      type: 'Webcast',
      downloadLink: '#',
    },
    {
      id: 4,
      date: 'July 10, 2025',
      title: '2025 Mid-Year Strategic Update',
      description: 'Comprehensive review of first-half performance and updated guidance for remainder of fiscal year.',
      type: 'Investor Presentation',
      downloadLink: '#',
    },
  ];

  const upcomingEvents: UpcomingEvent[] = [
    {
      id: 1,
      date: 'November 13, 2025',
      time: '4:30 PM ET',
      title: 'Q3 2025 Earnings Conference Call',
      description: 'Join our executive team as we discuss third quarter results and answer investor questions.',
      location: 'Virtual Webcast',
      type: 'Earnings Call',
      registrationLink: '#',
    },
    {
      id: 2,
      date: 'December 5, 2025',
      time: '9:00 AM PT',
      title: 'AI Infrastructure Summit 2025',
      description: 'DigiPowerX executives present at the annual AI Infrastructure Summit in San Francisco.',
      location: 'San Francisco, CA',
      type: 'Conference',
    },
    {
      id: 3,
      date: 'January 15, 2026',
      time: '2:00 PM ET',
      title: 'Sustainability & Innovation Webinar',
      description: 'Learn about our commitment to carbon-neutral operations and sustainable AI computing.',
      location: 'Virtual Webcast',
      type: 'Webcast',
      registrationLink: '#',
    },
  ];

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Investor Presentation': 'from-blue-500 to-cyan-500',
      'Earnings Call': 'from-green-500 to-teal-500',
      'Webcast': 'from-purple-500 to-pink-500',
      'Annual Report': 'from-orange-500 to-red-500',
      'Conference': 'from-indigo-500 to-blue-500',
    };
    return colors[type] || 'from-gray-500 to-slate-500';
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, typeof FileText> = {
      'Investor Presentation': FileText,
      'Earnings Call': Video,
      'Webcast': Video,
      'Annual Report': FileText,
      'Conference': Users,
    };
    return icons[type] || FileText;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 scroll-smooth transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden transition-colors duration-300">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-brand-cyan/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-20 w-72 h-72 bg-brand-navy/10 rounded-full blur-3xl"
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
              <FileText className="w-12 h-12 text-brand-cyan" />
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <GradientText>Presentations & Events</GradientText>
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="w-40 h-1.5 bg-gradient-to-r from-brand-navy to-brand-cyan rounded-full mx-auto mb-8" />
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 transition-colors duration-300">
              Explore our detailed investor presentations, strategic updates, quarterly reports, and upcoming events
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-brand-cyan/20 dark:border-brand-cyan/40 transition-colors duration-300">
                <span className="text-brand-cyan font-semibold">{presentations.length} Presentations</span>
              </motion.div>
              <motion.div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-brand-cyan/20 dark:border-brand-cyan/40 transition-colors duration-300">
                <span className="text-slate-600 dark:text-slate-300 font-medium transition-colors duration-300">{upcomingEvents.length} Upcoming Events</span>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Latest Presentations Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-2">
                  <GradientText>Latest Presentations</GradientText>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300">Download our recent investor materials and reports</p>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="space-y-6">
            {presentations.map((presentation) => {
              const TypeIcon = getTypeIcon(presentation.type);
              return (
                <StaggerItem key={presentation.id}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.005 }}
                    className="group bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-500 p-8 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden"
                  >
                    {/* Animated background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/0 to-brand-navy/0 group-hover:from-brand-cyan/5 group-hover:to-brand-navy/5 transition-all duration-500" />

                    {/* Thumbnail */}
                    <div className="flex-shrink-0 relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-48 h-48 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl shadow-lg flex items-center justify-center relative overflow-hidden"
                      >
                        {presentation.thumbnail ? (
                          <div className="absolute inset-0 bg-white/10 flex items-center justify-center p-4">
                            <img
                              src={presentation.thumbnail}
                              alt={presentation.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="relative z-10">
                            <TypeIcon className="w-20 h-20 text-white opacity-80" />
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <motion.div
                          className="p-2 bg-brand-cyan/10 rounded-lg"
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Calendar className="w-4 h-4 text-brand-cyan" />
                        </motion.div>
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300">{presentation.date}</span>
                        <span className={`px-3 py-1 text-xs font-bold text-white bg-gradient-to-r ${getTypeColor(presentation.type)} rounded-full`}>
                          {presentation.type}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-navy transition-colors duration-300">
                        {presentation.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed max-w-2xl transition-colors duration-300">
                        {presentation.description}
                      </p>

                      <a
                        href={presentation.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="inline-flex items-center gap-2 text-brand-cyan hover:text-brand-navy font-semibold transition-colors duration-300"
                        >
                          <Download className="w-5 h-5" />
                          Download PDF
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </a>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                <GradientText>Upcoming Events</GradientText>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300">
                Join us at upcoming webcasts, conferences, and earnings calls
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => {
              const TypeIcon = getTypeIcon(event.type);
              return (
                <StaggerItem key={event.id}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group h-full bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-500 p-6 relative overflow-hidden"
                  >
                    {/* Animated background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 group-hover:from-brand-cyan/10 group-hover:to-brand-navy/10 transition-all duration-500" />

                    <div className="relative z-10">
                      {/* Icon & Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          className={`p-3 rounded-xl bg-gradient-to-br ${getTypeColor(event.type)} bg-opacity-10`}
                          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <TypeIcon className="w-6 h-6 text-white" />
                        </motion.div>
                        <span className={`px-3 py-1 text-xs font-bold text-white bg-gradient-to-r ${getTypeColor(event.type)} rounded-full`}>
                          {event.type}
                        </span>
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-brand-cyan" />
                        <span className="text-sm font-semibold text-slate-900 dark:text-white transition-colors duration-300">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-brand-cyan" />
                        <span className="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-300">{event.time}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-brand-navy transition-colors duration-300">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed transition-colors duration-300">
                        {event.description}
                      </p>

                      {/* Location */}
                      <div className="flex items-center gap-2 mb-4 text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                        <MapPin className="w-4 h-4 text-brand-cyan" />
                        <span>{event.location}</span>
                      </div>

                      {/* Registration Button */}
                      {event.registrationLink && (
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            className="w-full bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-brand-cyan hover:to-brand-navy text-white font-semibold rounded-xl"
                          >
                            Register Now
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {/* Contact CTA */}
            <StaggerItem>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-10 shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.div
                    className="inline-block p-3 bg-white/10 rounded-xl mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="w-10 h-10 text-brand-cyan" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4">Contact Investor Relations</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    Have questions about our presentations or upcoming events? Our IR team is here to help.
                  </p>
                  <Link to="/contact-us">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-brand-cyan hover:to-brand-navy text-white font-semibold shadow-lg shadow-brand-cyan/20"
                      >
                        Get in Touch
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Email Alerts CTA */}
            <StaggerItem>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-10 shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.div
                    className="inline-block p-3 bg-white/10 rounded-xl mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Calendar className="w-10 h-10 text-brand-cyan" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4">Never Miss an Event</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    Subscribe to receive notifications about new presentations, webcasts, and upcoming events.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-brand-cyan hover:to-brand-navy text-white font-semibold shadow-lg shadow-brand-cyan/20"
                    >
                      Subscribe Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <Footer />
    </div>
  );
}
