import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

const StatCard = ({ value, label, delay = 0 }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Detect when element is visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
  }, []);

  // Count-up animation using requestAnimationFrame
  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // ms
      const start = 0;
      const end = parseFloat(value.replace(/[^\d.-]/g, "")); // Extract number
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentCount = Math.floor(progress * (end - start) + start);

        setCount(currentCount);

        if (progress < 1) requestAnimationFrame(animate);
        else setCount(end);
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: delay / 1000 + 0.2 }}
        className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-brand-navy to-brand-cyan bg-clip-text text-transparent mb-2"
      >
        {count}
        {value.includes("k") && "k"}
        {value.includes("+") && "+"}
        {value.includes("MW") && " MW"}
      </motion.div>
      <div className="text-slate-600 text-lg font-medium">{label}</div>
    </motion.div>
  );
};

export default StatCard;
