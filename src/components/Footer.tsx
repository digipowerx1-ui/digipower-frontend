import { Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

import Logo from '@/assets/Group1.png';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center">
              <img src={Logo} alt="DigiPowerX Logo" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-gray-400 dark:text-gray-300 text-sm mb-4 transition-colors duration-300">
              DigiPowerX is an innovative energy infrastructure company that develops cutting-edge data centers to drive the expansion of sustainable energy assets.
            </p>
            <a
              href="mailto:IR@digihostpower.com"
              className="text-sm text-gray-300 dark:text-gray-200 hover:text-cyan-400 transition-colors duration-300"
            >
              IR@digihostpower.com
            </a>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-4 text-white transition-colors duration-300">Company</h3>
            <ul className="space-y-2 text-gray-400 dark:text-gray-300 text-sm">
              <li><Link to="/" className="hover:text-white dark:hover:text-cyan-400 transition-colors duration-300">Home</Link></li>
              <li><Link to="/investor-relations" className="hover:text-white dark:hover:text-cyan-400 transition-colors duration-300">Investor Relations</Link></li>
              <li><Link to="/press-release" className="hover:text-white dark:hover:text-cyan-400 transition-colors duration-300">News</Link></li>
              <li><Link to="/presentations-events" className="hover:text-white dark:hover:text-cyan-400 transition-colors duration-300">Presentations</Link></li>
              
              <li>
                <Link 
                  to="/career" 
                  className="hover:text-white dark:hover:text-cyan-400 transition-colors duration-300"
                >
                  Career
                </Link>
              </li>

              {/* ✅ Partner Link Added */}
              <li>
                <Link 
                  to="/partner" 
                  className="hover:text-white dark:hover:text-cyan-400 transition-colors duration-300"
                >
                  Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Financials */}
          <div>
            <h3 className="font-bold mb-4 text-white transition-colors duration-300">Financials</h3>
            <ul className="space-y-2 text-gray-400 dark:text-gray-300 text-sm">
              <li><Link to="/Investor#stock-info" className="hover:text-white dark:hover:text-cyan-400 transition-colors duration-300">Stock Information</Link></li>
              <li>
                <Link 
                  to="/sec" 
                  className="hover:text-white dark:hover:text-cyan-400 transition-colors duration-300"
                >
                  SEC Filings
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & IR Resources */}
          <div>
            <h3 className="font-bold mb-4 text-white transition-colors duration-300">Governance</h3>
            <ul className="space-y-2 text-gray-400 dark:text-gray-300 text-sm mb-6">
              <li><Link to="/document" className="hover:text-white dark:hover:text-cyan-400 transition-colors duration-300">Documents & Charters</Link></li>
              <li><Link to="/leadership-committees" className="hover:text-white dark:hover:text-cyan-400 transition-colors duration-300">Leadership & Committees</Link></li>
            </ul>
            <h3 className="font-bold mb-4 text-white transition-colors duration-300">IR Resources</h3>
            <ul className="space-y-2 text-gray-400 dark:text-gray-300 text-sm">
              <li><Link to="/email-alerts" className="hover:text-white dark:hover:text-cyan-400 transition-colors duration-300">Email Alerts</Link></li>
              <li><Link to="/contact-us" className="hover:text-white dark:hover:text-cyan-400 transition-colors duration-300">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 dark:border-slate-700 pt-8 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-300 transition-colors duration-300">
              <span>© Copyright 2025 DigiPower X Inc.</span>
              <span>c/o Gateway Group.</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/digi-power-x" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-cyan-400 transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/DigiPowerX/" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-cyan-400 transition-colors duration-300" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/digipowerx/" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-cyan-400 transition-colors duration-300" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://x.com/DigipowerX" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-cyan-400 transition-colors duration-300" aria-label="X (Twitter)">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@DigiPowerX" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-cyan-400 transition-colors duration-300" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-cyan-400 transition-colors duration-300">Privacy Policy</Link>
              <Link to="/terms-of-use" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-cyan-400 transition-colors duration-300">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
