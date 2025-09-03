import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 animate-slide-up">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-brand-dark hover:text-brand-orange transition-colors duration-300">
            DIGIPOWERX
          </a>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="/about" className="text-brand-dark hover:text-brand-orange transition-all duration-200 hover:scale-105">
            About Us
          </a>

          <a href="/facilities" className="text-brand-dark hover:text-brand-orange transition-all duration-200 hover:scale-105">
            Facilities
          </a>

          <a href="/investor-relations" className="text-brand-dark hover:text-brand-orange transition-all duration-200 hover:scale-105">
            Investor Relations
          </a>

          <a href="/technology" className="text-brand-dark hover:text-brand-orange transition-all duration-200 hover:scale-105">
            Technology
          </a>

          <a href="/contact" className="text-brand-dark hover:text-brand-orange transition-all duration-200 hover:scale-105">
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="hidden lg:flex border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Contact us
          </Button>
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] bg-white">
              <div className="flex flex-col space-y-6 mt-8">
                <a href="/about" className="font-semibold text-brand-dark hover:text-brand-orange transition-colors">About Us</a>
                <a href="/facilities" className="font-semibold text-brand-dark hover:text-brand-orange transition-colors">Facilities</a>
                <a href="/investor-relations" className="font-semibold text-brand-dark hover:text-brand-orange transition-colors">Investor Relations</a>
                <a href="/technology" className="font-semibold text-brand-dark hover:text-brand-orange transition-colors">Technology</a>
                <a href="/contact" className="font-semibold text-brand-dark hover:text-brand-orange transition-colors">Contact</a>
                
                <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white w-full">
                  Contact us
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;