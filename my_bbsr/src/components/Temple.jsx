import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Loader2, MapPin, Clock, AlertCircle, Star, X } from 'lucide-react';

const Temple = () => {
  const [temples, setTemples] = useState([]);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:8080/temples');
      if (!response.ok) throw new Error('Failed to fetch temples data');

      const data = await response.json();
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(data.error_message || 'API request failed');
      }

      const transformedTemples = data.results.map((temple) => {
        let imageUrl = '';

        if (temple.photos?.[0]?.photo_reference) {
          imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${temple.photos[0].photo_reference}&key=AIzaSyCKTTfJD5_TERQvfVR-XimF7c2GJnBekC8`;
        } else {
          imageUrl = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop';
        }

        return {
          name: temple.name,
          image: imageUrl,
          location: temple.formatted_address,
          rating: temple.rating || 'N/A',
          userRatingsTotal: temple.user_ratings_total || 0,
          openNow: temple.opening_hours?.open_now ? 'Open Now' : 'Closed',
          placeId: temple.place_id,
          businessStatus: temple.business_status,
          types: temple.types || []
        };
      });

      setTemples(transformedTemples);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching temples:', err);
    } finally {
      setLoading(false);
    }
  };

  const TempleModal = ({ temple, onClose }) => {
    if (!temple) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl max-w-3xl w-full my-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="relative h-72 md:h-96">
              <img
                src={temple.image}
                alt={temple.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/95 hover:bg-white rounded-full p-2.5 transition-all hover:scale-110 shadow-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-800" />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8">
              <h3 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">{temple.name}</h3>

              <div className="space-y-5">
                {/* Rating */}
                <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
                  <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-lg text-stone-800">{temple.rating}</span>
                  </div>
                  <span className="text-stone-600">({temple.userRatingsTotal.toLocaleString()} reviews)</span>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <p className="text-stone-700 leading-relaxed">{temple.location}</p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${temple.openNow === 'Open Now'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                      }`}
                  >
                    {temple.openNow}
                  </span>
                </div>

                {/* Business Status */}
                {temple.businessStatus && (
                  <div className="pt-4">
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {temple.businessStatus}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section id="temples" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            Sacred Temples of Bhubaneswar
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover the spiritual heritage and architectural marvels of the Temple City
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-16 h-16 text-amber-600 animate-spin mb-6" />
            <p className="text-stone-600 text-xl font-medium">Discovering sacred temples...</p>
          </div>
        )}

        {/* Error State */}
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

        {/* Empty State */}
        {!loading && !error && temples.length === 0 && (
          <div className="text-center py-32">
            <p className="text-stone-500 text-xl">No temples found at the moment.</p>
          </div>
        )}

        {/* Temple Grid */}
        {!loading && !error && temples.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {temples.map((temple, index) => (
              <motion.div
                key={temple.placeId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedTemple(temple)}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full bg-white border-0 shadow-md">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-stone-200">
                    <img
                      src={temple.image}
                      alt={temple.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop';
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Temple Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {temple.name}
                      </h3>

                      {/* Rating Badge */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-white/95 px-2.5 py-1 rounded-full backdrop-blur-sm">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-bold text-stone-800">{temple.rating}</span>
                        </div>
                        <span className="text-xs text-white/90 font-medium">
                          ({temple.userRatingsTotal > 1000
                            ? `${(temple.userRatingsTotal / 1000).toFixed(1)}k`
                            : temple.userRatingsTotal})
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    {temple.openNow && (
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${temple.openNow === 'Open Now'
                              ? 'bg-green-500/95 text-white'
                              : 'bg-gray-500/95 text-white'
                            }`}
                        >
                          {temple.openNow}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 bg-white">
                    <div className="flex items-center gap-2 text-stone-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <p className="text-sm line-clamp-1">{temple.location.split(',')[0]}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedTemple && (
        <TempleModal temple={selectedTemple} onClose={() => setSelectedTemple(null)} />
      )}
    </section>
  );
};

export default Temple;