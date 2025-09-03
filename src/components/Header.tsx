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
          <h1 className="text-2xl font-bold text-brand-dark hover:text-brand-orange transition-colors duration-300 cursor-pointer">
            DIGIPOWERX
          </h1>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-brand-dark hover:text-brand-orange transition-all duration-200 group">
              <span>Data Center</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-200 shadow-2xl animate-slide-up">
              <DropdownMenuItem className="hover:bg-brand-light-gray transition-colors duration-200">AI HPC Colocation</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-brand-light-gray transition-colors duration-200">Custom Infrastructure</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-brand-light-gray transition-colors duration-200">Managed Services</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-brand-dark hover:text-brand-orange transition-all duration-200 group">
              <span>Cloud</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-200 shadow-2xl animate-slide-up">
              <DropdownMenuItem className="hover:bg-brand-light-gray transition-colors duration-200">GPU Compute</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-brand-light-gray transition-colors duration-200">Networking</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-brand-light-gray transition-colors duration-200">Storage</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-brand-dark hover:text-brand-orange transition-all duration-200 group">
              <span>Solutions</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-200 shadow-2xl animate-slide-up">
              <DropdownMenuItem className="hover:bg-brand-light-gray transition-colors duration-200">AI Training</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-brand-light-gray transition-colors duration-200">Machine Learning</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-brand-light-gray transition-colors duration-200">HPC Workloads</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a href="#partners" className="text-brand-dark hover:text-brand-orange transition-all duration-200 hover:scale-105">
            Partners
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-brand-dark hover:text-brand-orange transition-all duration-200 group">
              <span>Resources</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-200 shadow-2xl animate-slide-up">
              <DropdownMenuItem className="hover:bg-brand-light-gray transition-colors duration-200">Documentation</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-brand-light-gray transition-colors duration-200">Case Studies</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-brand-light-gray transition-colors duration-200">Blog</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                <div className="space-y-4">
                  <h4 className="font-semibold text-brand-dark">Data Center</h4>
                  <div className="pl-4 space-y-2">
                    <a href="#" className="block text-sm text-brand-gray hover:text-brand-orange transition-colors">AI HPC Colocation</a>
                    <a href="#" className="block text-sm text-brand-gray hover:text-brand-orange transition-colors">Custom Infrastructure</a>
                    <a href="#" className="block text-sm text-brand-gray hover:text-brand-orange transition-colors">Managed Services</a>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-brand-dark">Cloud</h4>
                  <div className="pl-4 space-y-2">
                    <a href="#" className="block text-sm text-brand-gray hover:text-brand-orange transition-colors">GPU Compute</a>
                    <a href="#" className="block text-sm text-brand-gray hover:text-brand-orange transition-colors">Networking</a>
                    <a href="#" className="block text-sm text-brand-gray hover:text-brand-orange transition-colors">Storage</a>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-brand-dark">Solutions</h4>
                  <div className="pl-4 space-y-2">
                    <a href="#" className="block text-sm text-brand-gray hover:text-brand-orange transition-colors">AI Training</a>
                    <a href="#" className="block text-sm text-brand-gray hover:text-brand-orange transition-colors">Machine Learning</a>
                    <a href="#" className="block text-sm text-brand-gray hover:text-brand-orange transition-colors">HPC Workloads</a>
                  </div>
                </div>
                
                <a href="#partners" className="font-semibold text-brand-dark hover:text-brand-orange transition-colors">Partners</a>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-brand-dark">Resources</h4>
                  <div className="pl-4 space-y-2">
                    <a href="#" className="block text-sm text-brand-gray hover:text-brand-orange transition-colors">Documentation</a>
                    <a href="#" className="block text-sm text-brand-gray hover:text-brand-orange transition-colors">Case Studies</a>
                    <a href="#" className="block text-sm text-brand-gray hover:text-brand-orange transition-colors">Blog</a>
                  </div>
                </div>
                
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