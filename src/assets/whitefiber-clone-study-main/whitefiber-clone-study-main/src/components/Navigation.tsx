import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      name: "Data Center",
      hasDropdown: true,
      items: ["AI/HPC Colocation", "Custom Solutions"]
    },
    {
      name: "Cloud",
      hasDropdown: true,
      items: ["Compute", "Networking", "Storage"]
    },
    {
      name: "Solutions",
      hasDropdown: true,
      items: ["Private AI", "Hybrid Cloud", "Enterprise"]
    },
    {
      name: "Partners",
      hasDropdown: false
    },
    {
      name: "Resources",
      hasDropdown: true,
      items: ["Documentation", "Case Studies", "Blog"]
    }
  ];

  return (
    <nav className="bg-background border-b border-whitefiber-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-whitefiber-dark tracking-wide">
              WHITEFIBER
            </h1>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative">
                <button
                  className="flex items-center text-whitefiber-dark hover:text-whitefiber-orange transition-colors duration-200 py-2"
                  onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {item.hasDropdown && openDropdown === item.name && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-48 bg-white border border-whitefiber-border rounded-md shadow-lg z-50"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.items?.map((subItem) => (
                      <a
                        key={subItem}
                        href="#"
                        className="block px-4 py-2 text-sm text-whitefiber-dark hover:bg-secondary hover:text-whitefiber-orange transition-colors duration-200"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Button */}
          <Button 
            variant="outline"
            className="border-whitefiber-dark text-whitefiber-dark hover:bg-whitefiber-dark hover:text-white transition-colors duration-200"
          >
            Contact us
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;