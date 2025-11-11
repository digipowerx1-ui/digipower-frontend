import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { FadeIn } from "@/components/animations/FadeIn";
import { Zap, MapPin } from "lucide-react";
 
interface SlideData {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  capacity: string;
  location: string;
  status: "Operational" | "Development" | "Expansion";
}
 
interface ProjectsSliderProps {
  slides?: SlideData[];
}
 
export default function ProjectsSlider({ slides }: ProjectsSliderProps) {
  const splideRootRef = useRef<HTMLDivElement | null>(null);
  const splideInstanceRef = useRef<Splide | null>(null);
 
  useEffect(() => {
    if (!splideRootRef.current) return;
 
    splideInstanceRef.current = new Splide(splideRootRef.current, {
      type: "fade",
      rewind: true,
      autoplay: true,
      interval: 4000,
      speed: 1000,
      pauseOnHover: true,
      arrows: true,
      pagination: true,
      drag: true,
      keyboard: true,
    });
 
    splideInstanceRef.current.mount();
 
    return () => {
      if (splideInstanceRef.current) {
        splideInstanceRef.current.destroy();
        splideInstanceRef.current = null;
      }
    };
  }, []);
 
  const defaultSlides: SlideData[] = [
    {
      imageUrl:
        "https://cdn.prod.website-files.com/66f727b0f2cf943df67f3121/672193ab70dde9c6e62ee75f_Unknown.avif",
      imageAlt: "North Tonawanda Power Plant",
      title: "North Tonawanda Power Plant",
      capacity: "123 MW",
      location: "New York",
      status: "Operational",
      description:
        "State-of-the-art 60 MW combined cycle power plant utilizing both gas and steam turbines for maximum efficiency.",
    },
    {
      imageUrl:
        "https://cdn.prod.website-files.com/66f727b0f2cf943df67f3121/672193aa5666f763dd3c6466_Unknown-1.avif",
      imageAlt: "Buffalo Hydropower Facility",
      title: "Buffalo Hydropower Data Center",
      capacity: "18.7 MW",
      location: "Buffalo, NY",
      status: "Operational",
      description:
        "Leverages sustainable hydropower infrastructure. Tier III-compliant with advanced cooling systems.",
    },
    {
      imageUrl:
        "https://cdn.prod.website-files.com/66f727b0f2cf943df67f3121/672533504e766ccec981b09a_Unknown.jpeg",
      imageAlt: "Alabama Data Center",
      title: "Alabama Utility-Powered Facility",
      capacity: " 55 MW",
      location: "Alabama",
      status: "Operational",
      description:
        "22 MW substation with direct utility connectivity, optimized for high-density AI workloads.",
    },
    {
      imageUrl:
        "https://cdn.prod.website-files.com/66f727b0f2cf943df67f3121/672533504e766ccec981b09a_Unknown.jpeg",
      imageAlt: "North Carolina Development Site",
      title: "North Carolina Development Site",
      capacity: "200 MW",
      location: "North Carolina",
      status: "Development",
      description:
        "200 MW flagship development project powered by ARMS 200 modular infrastructure.",
    },
  ];
 
  const renderSlides = slides || defaultSlides;
 
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Operational: "from-green-500 to-teal-500",
      Development: "from-orange-500 to-red-500",
      Expansion: "from-blue-500 to-cyan-500",
    };
    return colors[status] || "from-gray-500 to-slate-500";
  };
 
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-brand-navy to-brand-cyan bg-clip-text text-transparent">
                Our Facilities
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore our state-of-the-art data centers across the United States
            </p>
          </div>
        </FadeIn>
 
        {/* SPLIDE SLIDER */}
        <FadeIn delay={0.3}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-slate-700"
          >
            <div ref={splideRootRef} className="splide w-full">
              <div className="splide__track">
                <ul className="splide__list">
                  {renderSlides.map((slide, idx) => (
                    <li key={idx} className="splide__slide relative">
 
                      {/* Image */}
                      <div className="relative h-[500px] md:h-[600px]">
                        <img
                          src={slide.imageUrl}
                          alt={slide.imageAlt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      </div>
 
                      {/* Text Overlay */}
                      <div className="absolute inset-0 flex items-end">
                        <div className="p-8 md:p-12 lg:p-16 w-full">
                          <div className="max-w-3xl">
 
                            {/* Badges */}
                            <div className="flex flex-wrap gap-3 mb-4">
                              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                <MapPin className="w-4 h-4 text-brand-cyan" />
                                <span className="text-white text-sm">{slide.location}</span>
                              </div>
 
                              <div
                                className={`px-4 py-2 rounded-full bg-gradient-to-r ${getStatusColor(
                                  slide.status
                                )}`}
                              >
                                <span className="text-white text-sm font-bold">
                                  {slide.status}
                                </span>
                              </div>
                            </div>
 
                            {/* Title */}
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                              {slide.title}
                            </h2>
 
                            <div className="flex items-center gap-2 mb-4">
                              <Zap className="w-5 h-5 text-brand-cyan" />
                              <span className="text-2xl font-bold text-brand-cyan">
                                {slide.capacity}
                              </span>
                            </div>
 
                            <p className="text-gray-200 text-lg leading-relaxed">
                              {slide.description}
                            </p>
 
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
 
      {/* Slider Styles */}
      <style>{`
        .splide__arrow {
          top: 50% !important;
          transform: translateY(-50%);
          background: rgba(1,211,255,0.9);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255,255,255,0.2);
          transition: 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .splide__arrow:hover {
          background: rgba(51,65,82,0.9);
          transform: translateY(-50%) scale(1.1);
        }
        .splide__pagination {
          bottom: 22px !important;
        }
        .splide__pagination__page {
          width: 12px;
          height: 12px;
          margin: 0 6px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
          transition: 0.3s ease;
        }
        .splide__pagination__page.is-active {
          width: 36px;
          border-radius: 12px;
          background: rgba(1,211,255,1);
        }
      `}</style>
    </section>
  );
}
 