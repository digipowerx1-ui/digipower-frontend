import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "reverse";
}

/**
 * GradientText - Reusable component for gradient text styling
 * @param children - Text content to apply gradient to
 * @param className - Additional CSS classes
 * @param variant - Gradient direction (primary: navy to cyan, reverse: cyan to navy)
 */
const GradientText = ({
  children,
  className = "",
  variant = "primary"
}: GradientTextProps) => {
  const gradientClass = variant === "primary"
    ? "from-brand-navy to-brand-cyan"
    : "from-brand-cyan to-brand-navy";

  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradientClass,
        className
      )}
    >
      {children}
    </span>
  );
};

export default GradientText;
