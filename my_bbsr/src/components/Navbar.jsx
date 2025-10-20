import React, { useState } from 'react'
import { motion } from "framer-motion"
import { TowerControl,Landmark, UtensilsCrossed,ChurchIcon,MapPin,GraduationCap } from "lucide-react"

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

      const navItems = [
    { name: 'Home', id: 'home', icon: Landmark },
    { name: 'Food', id: 'food', icon:  UtensilsCrossed  },
    { name: 'Temples', id: 'temples', icon: ChurchIcon },
    { name: 'Attractions', id: 'attractions', icon: MapPin },
    { name: 'Colleges', id: 'colleges', icon: GraduationCap }
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <TowerControl className="w-8 h-8 text-amber-700" />
              <span className="text-2xl font-bold text-stone-800">Bhubaneswar</span>
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
                  className="flex items-center space-x-1 text-stone-600 hover:text-amber-700 transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-stone-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <div className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white border-t"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center space-x-2 w-full px-4 py-3 text-stone-600 hover:bg-stone-100"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </nav>
  )
}
