"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import digipowerxLogo from "@/assets/Digi powerX-09.png";


const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = async () => {
    if (!email) return setStatus("⚠️ Please enter a valid email");

    try {
      // ✅ Direct Strapi Cloud API endpoint
      const apiUrl = `https://artistic-eggs-9d7a8f2a5f.strapiapp.com/api/subscribers`;
      const token = import.meta.env.VITE_STRAPI_API_TOKEN;

      console.log("📡 Subscribing to:", apiUrl);

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // keep token for auth
        },
        body: JSON.stringify({
          data: { Email: email }, // ✅ field name matches Strapi
        }),
      });

      if (res.ok) {
        setStatus("✅ Subscribed successfully!");
        setEmail("");
      } else {
        const error = await res.json();
        console.error("❌ Subscription error:", error);
        setStatus("⚠️ " + (error?.error?.message || "Subscription failed"));
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      setStatus("❌ Network error. Try again later.");
    }
  };

  return (
    <footer className="bg-brand-dark text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-8">

          {/* Company Info */}
          <div className="md:col-span-2">
            {/* Logo */}
            <img
              src={digipowerxLogo}
              alt="DIGIPOWERX Logo"
              className="h-12 mb-4"
            />

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

          {/* Data Center */}
          <div>
            <h4 className="font-semibold mb-6 text-brand-white">Data Center</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-brand-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  AI HPC Colocation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Custom Infrastructure
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Managed Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Private AI
                </a>
              </li>
            </ul>
          </div>

          {/* Cloud Solutions */}
          <div>
            <h4 className="font-semibold mb-6 text-brand-white">
              Cloud Solutions
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-brand-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  GPU Compute
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Networking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Storage Solutions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  GPU Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-6 text-brand-white">Newsletter</h4>
            <p className="text-gray-300 text-sm mb-4">
              Stay updated with the latest AI infrastructure innovations and
              industry insights.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-white transition-colors duration-200"
              />
              <Button
                onClick={handleSubscribe}
                className="w-full bg-brand-white hover:bg-brand-white-hover text-white font-medium group transition-all duration-300 hover:scale-105 border border-white"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>

              {status && (
                <p className="text-sm mt-2 text-gray-400">{status}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; 2024 DigiPowerX. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a
                href="#"
                className="hover:text-brand-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-brand-white transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-brand-white transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
