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
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: "Projects", href: "/projects", isRoute: true },

    {
      label: "Investors",
      href: "/investor-relations",
      isRoute: true,
      dropdown: [
        { label: "Press Releases", href: "/press-release", desc: "Official investor announcements and news" },
        { label: "Presentations & Events", href: "/presentations-events", desc: "Investor meetups, talks, and conferences" }
      ],
    },

    { label: "SEC Filings", href: "/sec", isRoute: true },
    { label: "Leadership & Committees", href: "/leadership-committees", isRoute: true },
    { label: "Careers", href: "/career", isRoute: true },
    { label: "Partnership", href: "/partner", isRoute: true },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200/20 backdrop-blur-xl bg-slate-900/95 shadow-lg"
          : "border-b border-border/40 backdrop-blur-xl bg-background/80"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.img
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            src={logo}
            alt="DigiPowerX Logo"
            className="h-10 w-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.href}
                className="relative flex items-center gap-1 text-white hover:text-brand-cyan transition-colors duration-300 font-medium group"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-brand-navy to-brand-cyan transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Desktop Dropdown */}
              <AnimatePresence>
                {openDropdown === item.label && item.dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute left-0 mt-4 w-80 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    {item.dropdown.map((dropItem, idx) => (
                      <Link
                        key={idx}
                        to={dropItem.href}
                        className="flex flex-col items-start px-5 py-4 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <span className="text-white font-medium group-hover:text-brand-cyan">{dropItem.label}</span>
                        {dropItem.desc && (
                          <span className="text-gray-400 text-xs mt-1 group-hover:text-gray-200 transition-colors duration-300">
                            {dropItem.desc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            {theme === "light" ? <Moon size={20} className="text-white" /> : <Sun size={20} className="text-white" />}
          </motion.button>

          {/* Contact Button */}
          <Link to="/contact-us">
            <Button className="bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-brand-cyan hover:to-brand-navy text-white font-medium text-base px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-900/95 border-t border-gray-700/30"
          >
            <div className="px-6 py-6 space-y-4">

              {/* Mobile Nav Items */}
              {navItems.map((item, index) => (
                <div key={index}>
                  {/* Parent Item */}
                  {item.dropdown ? (
                    <div
                      className="flex items-center text-white py-2 px-4 rounded-lg hover:bg-white/5"
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                    >
                      <span>{item.label}</span>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-white py-2 px-4 rounded-lg hover:bg-white/5"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown Items */}
                  <AnimatePresence>
                    {openDropdown === item.label && item.dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="pl-6 space-y-2 mt-2"
                      >
                        {item.dropdown.map((dropItem, idx) => (
                          <Link
                            key={idx}
                            to={dropItem.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-300 hover:text-white transition-colors duration-200"
                          >
                            {dropItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* DARK MODE TOGGLE */}
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                <span className="text-sm font-medium">
                  {theme === "light" ? "Enable Dark Mode" : "Disable Dark Mode"}
                </span>
              </motion.button>

              {/* CONTACT US BUTTON */}
              <Link to="/contact-us" onClick={() => setIsOpen(false)}>
                <Button className="w-full mt-4 bg-gradient-to-r from-brand-navy to-brand-cyan hover:from-brand-cyan hover:to-brand-navy text-white font-medium text-base py-3 rounded-lg shadow-md hover:shadow-xl transition-all">
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
