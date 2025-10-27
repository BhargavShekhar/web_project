import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FoodCenter from './components/FoodCenter';
import TouristAttraction from './components/TouristAttraction';
import Footer from './components/Footer';
import EngineeringCollege from './components/EngineeringCollege';
import { HeroSection } from './components/HeroSection';
import TempleDialog from './components/TempleDialog';
import TemplePage from './components/TemplePage';

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
      <Navbar/>
      <HeroSection/>
      <TemplePage/>
      <FoodCenter/>
      <TempleDialog/>
      <TouristAttraction/>
      <EngineeringCollege/>
      <Footer/>
    </div>
  );
};

export default ExploreBhubaneswar;