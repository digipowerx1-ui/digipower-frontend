interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

const StatCard = ({ value, label, delay = 0 }: StatCardProps) => {
  return (
    <div 
      className="text-center animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <div className="text-muted-foreground text-lg">{label}</div>
    </div>
  );
};

export default StatCard;
