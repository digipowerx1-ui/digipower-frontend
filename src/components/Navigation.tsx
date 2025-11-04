import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Project", href: "#Project" },
    { label: "About", href: "#about" },
    { label: "Infrastructure", href: "#Infrastructure" },
    { label: "Investors", href: "#Investors" },
    { label: "Press Release", href: "#Press Release" },
    { label: "Leadership", href: "#Leadership" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/80">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">
              <img
                src="src/assets/Group1.png"
                alt="DigiPowerX Logo"
                className="h-10 w-auto object-contain"
              />
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white hover:text-accent transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
            <Button
  size="lg"
  className="bg-gradient-to-r from-[#334152] to-[#01d3ff] hover:from-[#01b4e5] hover:to-[#334152] text-white font-medium text-base px-6 py-3 rounded-lg shadow-md transition-all duration-300"
>
 Contact us
</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-white hover:text-accent transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          <Button
  size="lg"
  className="w-full bg-gradient-to-r from-[#334152] to-[#01d3ff] hover:from-[#01b4e5] hover:to-[#334152] text-white font-semibold rounded-lg shadow-md transition-all duration-300"
>
  Contact Us
</Button>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
