import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <Card 
      className="group relative p-6 bg-card border-border/50 hover:border-accent transition-all duration-500 hover:shadow-[0_0_40px_hsl(168_100%_60%/0.3)] animate-fade-in-up overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="mb-4 w-14 h-14 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_hsl(168_100%_60%/0.4)]">
          <Icon className="w-7 h-7 text-accent group-hover:animate-scale-bounce" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
      
      {/* Bottom glow line that expands on hover */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-500" />
    </Card>
  );
};

export default FeatureCard;
