import React from 'react'
import { Button } from '@/components/ui/button';
import {motion,useScroll, useTransform } from 'framer-motion'
// import { scrollToSection } from 

export const HeroSection = () => {
    const { scrollY } = useScroll();

    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);

      const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
        <section id="home" className="relative h-screen overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 to-stone-900/70 z-10" />
          <img
            src="https://i.pinimg.com/736x/c5/98/7b/c5987bb992af40a0478042025eff1568.jpg"
            alt="Bhubaneswar Skyline"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Explore Bhubaneswar
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-amber-200 mb-8"
            >
              The Temple City of India
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => scrollToSection('temples')}
                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-6 text-lg"
              >
                Discover Temples
              </Button>
              <Button
                onClick={() => scrollToSection('food')}
                variant="outline"
                className="border-2 border-white text-muted-foreground hover:bg-white hover:text-stone-800 px-8 py-6 text-lg"
              >
                Explore Cuisine
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
  )
}
