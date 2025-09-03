import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const navLinkClasses = "text-brand-dark hover:text-brand-orange transition-all duration-200 hover:scale-105";

  return (
    <header className="bg-white border-b border-gray-200 animate-slide-up">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/">
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="/about" className={navLinkClasses}>About Us</a>
          <a href="/facilities" className={navLinkClasses}>Projects</a>
          <a href="/investor-relations" className={navLinkClasses}>Investor Relations</a>
          <a href="/technology" className={navLinkClasses}>Leadership & Committees</a>
          <a href="/contact" className={navLinkClasses}>Contact</a>
        </nav>

        {/* Contact button + Mobile Menu */}
        <div className="flex items-center space-x-4">
          

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
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
