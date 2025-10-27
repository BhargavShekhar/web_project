import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Loader2, MapPin, AlertCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TemplePage = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemples();
  }, []);

  useEffect(() => {
    if (temples.length > 0 && scrollContainerRef.current) {
      startAutoScroll();
    }
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [temples]);

  const startAutoScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    autoScrollRef.current = setInterval(() => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 350, behavior: 'smooth' });
      }
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    stopAutoScroll();
    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    setTimeout(() => startAutoScroll(), 5000);
  };

  const fetchTemples = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:8080/temples-list');
      if (!response.ok) throw new Error('Failed to fetch temples data');

      const data = await response.json();
      if (!data.results) throw new Error('No temples found');

      setTemples(data.results);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching temples:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-20 bg-gradient-to-b from-amber-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            Sacred Temples of Bhubaneswar
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover the spiritual heritage and architectural marvels of the Temple City
          </p>
        </motion.div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-16 h-16 text-amber-600 animate-spin mb-6" />
            <p className="text-stone-600 text-xl font-medium">Discovering sacred temples...</p>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md w-full shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-red-800">Unable to Load Temples</h3>
              </div>
              <p className="text-red-600 mb-6 leading-relaxed">{error}</p>
              <button
                onClick={fetchTemples}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {!loading && !error && temples.length === 0 && (
          <div className="text-center py-32">
            <p className="text-stone-500 text-xl">No temples found at the moment.</p>
          </div>
        )}

        {!loading && !error && temples.length > 0 && (
          <div className="relative group">
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-stone-800" />
            </button>

            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-stone-800" />
            </button>

            <div
              ref={scrollContainerRef}
              onMouseEnter={stopAutoScroll}
              onMouseLeave={startAutoScroll}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
            >
              {temples.map((temple, index) => (
                <motion.div
                  key={temple.placeId}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate(`/temple/${temple.placeId}`)}
                  className="cursor-pointer flex-shrink-0 w-80 sm:w-96"
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full bg-white border-0 shadow-lg">
                    <div className="relative h-64 overflow-hidden bg-stone-200">
                      <img
                        src={temple.image}
                        alt={temple.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop';
                        }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                          {temple.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-bold text-stone-800">{temple.rating}</span>
                          </div>
                          <span className="text-sm text-white/95 font-medium">
                            ({temple.userRatingsTotal > 1000
                              ? `${(temple.userRatingsTotal / 1000).toFixed(1)}k`
                              : temple.userRatingsTotal})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <p className="text-sm line-clamp-1">{temple.location.split(',')[0]}</p>
                        </div>
                      </div>
                      {temple.openNow && (
                        <div className="absolute top-3 right-3">
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
                              temple.openNow === 'Open Now'
                                ? 'bg-green-500/95 text-white'
                                : 'bg-gray-500/95 text-white'
                            }`}
                          >
                            {temple.openNow}
                          </span>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-6">
              <p className="text-stone-500 text-sm">← Scroll or hover to pause auto-scroll →</p>
            </div>
          </div>
        )}
      </div>

      {/* Remove jsx prop warning by using plain style */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </motion.section>
  );
};

export default TemplePage;
