import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/Group1.png";
import { useTheme } from "@/contexts/ThemeContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: "Projects", href: "/projects", isRoute: true },
    { label: "Investors", href: "/investor-relations", isRoute: true },

    // ✅ ADDED SEC FILINGS
    { label: "SEC Filings", href: "/sec", isRoute: true },

    { label: "Press Release", href: "/press-release", isRoute: true },
    { label: "Presentations & Events", href: "/presentations-events", isRoute: true },
    { label: "Leadership & Committees", href: "/leadership-committees", isRoute: true },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on location change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200/20 backdrop-blur-xl bg-slate-900/95 shadow-lg"
          : "border-b border-border/40 backdrop-blur-xl bg-background/80"
      }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-3 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.img
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            src={logo}
            alt="DigiPowerX Logo"
            className="h-10 w-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={`${item.label}-${index}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
            >
              {item.isRoute ? (
                <Link
                  to={item.href}
                  className="relative text-white hover:text-brand-cyan transition-colors duration-300 font-medium group"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-brand-navy to-brand-cyan transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="relative text-white hover:text-brand-cyan transition-colors duration-300 font-medium group"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-brand-navy to-brand-cyan transition-all duration-300 group-hover:w-full" />
                </a>
              )}
            </motion.div>
          ))}

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait">
              {theme === "light" ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={20} className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={20} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Contact Button */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
            <Link to="/contact-us">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-brand-cyan hover:to-brand-navy text-white font-medium text-base px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                  Contact Us
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Icon */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          aria-label="Toggle Mobile Menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-slate-900/95 backdrop-blur-xl border-t border-gray-200/10"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={`mobile-${item.label}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={item.href}
                    className="block text-white hover:text-brand-cyan transition-colors duration-200 font-medium py-2 px-4 hover:bg-white/5 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Theme Toggle Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.1, duration: 0.3 }}
                className="flex items-center justify-center"
              >
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 w-full py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                >
                  {theme === "light" ? (
                    <>
                      <Moon size={20} className="text-white" />
                      <span className="text-white font-medium">Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun size={20} className="text-white" />
                      <span className="text-white font-medium">Light Mode</span>
                    </>
                  )}
                </button>
              </motion.div>

              {/* Contact Button Mobile */}
              <Link to="/contact-us" onClick={() => setIsOpen(false)}>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-brand-cyan hover:to-brand-navy text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;