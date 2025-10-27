import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Compass, Landmark, UtensilsCrossed, Home, MapPin, GraduationCap, Book, X, ShoppingBag  } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
  { name: 'Home', id: 'home', icon: Landmark },
  { name: 'History', id: 'history', icon: Book },
  { name: 'Food', id: 'food', icon: UtensilsCrossed },
  { name: 'Temples', id: 'temples', icon: Home },
  { name: 'Attractions', id: 'touristAttractions', icon: MapPin },
  { name: 'Shops', id: 'shopping', icon: ShoppingBag }, // <-- new item added
  { name: 'Colleges', id: 'colleges', icon: GraduationCap },
];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent backdrop-blur-0 shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <img
              src="https://emojigraph.org/media/google/hindu-temple_1f6d5.png"
              alt="Temple Icon"
              className="w-10 h-10"
            />
            <span
              className={`text-2xl font-bold ${
                scrolled ? "text-stone-800" : "text-white"
              }`}
            >
              Bhubaneswar
            </span>
          </motion.div>


          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-1 transition-colors ${
                  scrolled
                    ? "text-stone-600 hover:text-amber-700"
                    : "text-white hover:text-amber-300"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X
                className={`w-6 h-6 ${
                  scrolled ? "text-stone-800" : "text-white"
                }`}
              />
            ) : (
              <div
                className={`w-6 h-1 bg-current rounded ${
                  scrolled ? "text-stone-800" : "text-white"
                }`}
              ></div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`md:hidden transition-all ${
            scrolled ? "bg-white/95" : "bg-stone-900/80"
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-2 w-full px-4 py-3 ${
                scrolled
                  ? "text-stone-600 hover:bg-stone-100"
                  : "text-white hover:bg-stone-800/40"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
