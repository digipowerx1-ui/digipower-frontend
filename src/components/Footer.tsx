import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6">DIGIPOWERX</h3>
            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
              The AI Infrastructure Company providing world-class data center and cloud solutions for scaling training, inference, and other demanding high-performance compute workloads.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200">
                <Mail className="h-4 w-4" />
                <span className="text-sm">contact@digipowerx.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">San Jose, California</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-brand-orange">Data Center</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-brand-orange transition-all duration-200 hover:translate-x-1 inline-block">AI HPC Colocation</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-all duration-200 hover:translate-x-1 inline-block">Custom Infrastructure</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-all duration-200 hover:translate-x-1 inline-block">Managed Services</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-all duration-200 hover:translate-x-1 inline-block">Private AI</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-brand-orange">Cloud Solutions</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-brand-orange transition-all duration-200 hover:translate-x-1 inline-block">GPU Compute</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-all duration-200 hover:translate-x-1 inline-block">Networking</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-all duration-200 hover:translate-x-1 inline-block">Storage Solutions</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-all duration-200 hover:translate-x-1 inline-block">GPU Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-brand-orange">Newsletter</h4>
            <p className="text-gray-300 text-sm mb-4">
              Stay updated with the latest AI infrastructure innovations and industry insights.
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-orange transition-colors duration-200"
              />
              <Button className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white font-medium group transition-all duration-300 hover:scale-105">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; 2024 DigiPowerX. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-brand-orange transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-brand-orange transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-brand-orange transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;