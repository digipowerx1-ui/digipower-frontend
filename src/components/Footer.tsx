import { Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import Logo from '@/assets/Group1.png';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-5 gap-8 mb-12">

          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center">
              <Image src={Logo} alt="DigiPowerX Logo" className="h-10 w-auto object-contain" priority />
            </div>

            <p className="text-gray-400 dark:text-gray-300 text-sm mb-4 transition-colors duration-300">
              DigiPowerX is an innovative energy infrastructure company that develops cutting-edge data centers
              to drive the expansion of sustainable energy assets.
            </p>

            <a
              href="mailto:ir@digipowerx.com"
              className="text-sm text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              ir@digipowerx.com
            </a>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/investor-relations" className="hover:text-white transition-colors">Investor Relations</Link></li>
              <li><Link href="/press-releases" className="hover:text-white transition-colors">News</Link></li>
              <li><Link href="/presentations-events" className="hover:text-white transition-colors">Presentations</Link></li>
              <li><Link href="/career" className="hover:text-white transition-colors">Career</Link></li>
              <li><Link href="/partner" className="hover:text-white transition-colors">Partner</Link></li>
            </ul>
          </div>

          {/* Financials */}
          <div>
            <h3 className="font-bold mb-4">Financials</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/stock-information" className="hover:text-white transition-colors">Stock Information</Link></li>
              <li><Link href="/sec-filings" className="hover:text-white transition-colors">SEC Filings</Link></li>
            </ul>
          </div>

          {/* Governance & IR Resources */}
          <div>
            <h3 className="font-bold mb-4">Governance</h3>
            <ul className="space-y-2 text-gray-400 text-sm mb-6">
              <li><Link href="/document" className="hover:text-white transition-colors">Documents & Charters</Link></li>
              <li><Link href="/leadership-committees" className="hover:text-white transition-colors">Leadership & Committees</Link></li>
            </ul>

            <h3 className="font-bold mb-4">IR Resources</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/email-alerts" className="hover:text-white transition-colors">Email Alerts</Link></li>
              <li><Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 dark:border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Corrected Copyright */}
            <div className="text-sm text-gray-400">
              © Copyright 2025 DigiPower X Inc.
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/digi-power-x" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/DigiPowerX/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/digipowerx/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://x.com/DigipowerX" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@DigiPowerX" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-use" className="text-gray-400 hover:text-white transition-colors">Terms of Use</Link>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
