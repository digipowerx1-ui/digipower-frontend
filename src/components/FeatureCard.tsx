import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon?: LucideIcon;
  image?: string;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, image, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="group h-full p-8 bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/50 hover:border-brand-cyan/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(1,211,255,0.15)] relative overflow-hidden">
        
        {/* Hover Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-navy/0 group-hover:from-brand-cyan/5 group-hover:to-brand-navy/5 transition-all duration-500" />

        {/* Icon OR Image */}
        <motion.div
          className="mb-6 w-16 h-16 rounded-xl bg-gradient-to-br from-brand-navy/10 to-brand-cyan/10 flex items-center justify-center group-hover:from-brand-cyan/20 group-hover:to-brand-navy/20 transition-all duration-500 relative z-10"
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {image ? (
            <img src={image} alt={title} className="w-10 h-10 object-contain" />
          ) : Icon ? (
            <Icon className="w-8 h-8 text-brand-cyan group-hover:text-brand-navy transition-colors duration-500" />
          ) : null}
        </motion.div>

        <h3 className="text-2xl font-bold mb-3 text-slate-900 relative z-10 group-hover:text-brand-navy transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed relative z-10">{description}</p>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
