import React from 'react'
import { MapPin,UtensilsCrossed,Landmark,ChurchIcon, GraduationCap, Phone, Mail,Facebook, Twitter, Instagram} from 'lucide-react';
const Footer = () => {

      const navItems = [
    { name: 'Home', id: 'home', icon: Landmark },
    { name: 'Food', id: 'food', icon: UtensilsCrossed },
    { name: 'Temples', id: 'temples', icon: ChurchIcon },
    { name: 'Attractions', id: 'attractions', icon: MapPin },
    { name: 'Colleges', id: 'colleges', icon: GraduationCap }
  ];


  return (
        <footer className="bg-stone-800 text-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ChurchIcon className="w-8 h-8 text-amber-500" />
                <span className="text-2xl font-bold">Bhubaneswar</span>
              </div>
              <p className="text-stone-400">
                Discover the rich heritage, culture, and modern attractions of India's Temple City.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-500">Quick Links</h3>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block hover:text-amber-500 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-500">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 674 XXX XXXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@explorebhubaneswar.in</span>
                </div>
                <div className="flex space-x-4 mt-4">
                  <Facebook className="w-5 h-5 hover:text-amber-500 cursor-pointer transition-colors" />
                  <Twitter className="w-5 h-5 hover:text-amber-500 cursor-pointer transition-colors" />
                  <Instagram className="w-5 h-5 hover:text-amber-500 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-700 mt-8 pt-8 text-center text-stone-400">
            <p>&copy; 2025 Explore Bhubaneswar. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer