import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { UtensilsCrossed, Landmark, GraduationCap, Phone, Mail, Facebook, Twitter, Instagram, ChurchIcon, MapPin, TowerControl } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Navbar from './components/Navbar';
import FoodCenter from './components/FoodCenter';
import Temple from './components/Temple';
import TouristAttraction from './components/TouristAttraction';
import Footer from './components/Footer';
import EngineeringCollege from './components/EngineeringCollege';
import { HeroSection } from './components/HeroSection';
import TempleDialog from './components/TempleDialog';

const ExploreBhubaneswar = () => {


  const [currentCarousel, setCurrentCarousel] = useState(0);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarousel((prev) => (prev + 1) % attractions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans bg-stone-50">
      {/* Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <HeroSection/>

      {/* Food Centers Section */}
      <FoodCenter/>

      {/* Temples Section */}
      <Temple/>
      {/* Temple Dialog */}
      <TempleDialog/>
      {/* Tourist Attractions Carousel */}
      <TouristAttraction/>

      {/* Top Engineering Colleges */}
      <EngineeringCollege/>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default ExploreBhubaneswar;