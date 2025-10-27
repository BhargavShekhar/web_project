import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapPin, Star, Clock, ArrowLeft, AlertCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Main App Component
const FoodCenter = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  const navigateToDetails = (placeId) => {
    setSelectedPlaceId(placeId);
    setCurrentView('details');
  };

  const navigateToList = () => {
    setCurrentView('list');
    setSelectedPlaceId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <AnimatePresence mode="wait">
        {currentView === 'list' ? (
          <FoodCenterList key="list" onNavigate={navigateToDetails} />
        ) : (
          <FoodCenterDetails key="details" placeId={selectedPlaceId} onBack={navigateToList} />
        )}
      </AnimatePresence>
    </div>
  );
};

// List View Component
const FoodCenterList = ({ onNavigate }) => {
  const [foodCenters, setFoodCenters] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(6);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFoodCenters();
  }, []);

  const fetchFoodCenters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:8080/food-centers');
      if (!response.ok) throw new Error('Failed to fetch food centers');
      const data = await response.json();

      const centers = data.results?.map(place => ({
        placeId: place.place_id,
        name: place.name,
        description: place.editorial_summary?.overview || place.types?.slice(0, 2).map(t => t.replace(/_/g, ' ')).join(' • ') || 'Restaurant',
        location: place.formatted_address || place.vicinity || 'Bhubaneswar',
        image: place.photos?.[0]?.photo_reference
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${place.photos[0].photo_reference}&key=AIzaSyCKTTfJD5_TERQvfVR-XimF7c2GJnBekC8`
          : 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
        rating: place.rating,
        priceLevel: place.price_level,
        types: place.types || []
      })) || [];

      setFoodCenters(centers);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setDisplayedItems(prev => Math.min(prev + 6, foodCenters.length));
      setLoadingMore(false);
    }, 500);
  };

  const visibleCenters = foodCenters.slice(0, displayedItems);
  const hasMore = displayedItems < foodCenters.length;

  if (loading) return <LoadingSkeleton />;

  if (error) return <ErrorAlert message={error} retry={fetchFoodCenters} />;

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 bg-clip-text text-transparent mb-4">
            Famous Food Centers
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover the authentic flavors of Bhubaneswar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleCenters.map((food, index) => {
            // console.log(food)
            return (
              <motion.div key={food.placeId} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -8 }}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-md h-full" onClick={() => onNavigate(food.placeId)}>
                  <div className="relative h-56 overflow-hidden">
                    <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Rating */}
                    {food.rating && (
                      <Badge className="absolute top-4 left-4 bg-white/95 text-stone-800 hover:bg-white">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-1" />
                        {food.rating}
                      </Badge>
                    )}

                    {/* Price Level */}
                    {food.priceLevel && (
                      <Badge className="absolute top-4 right-4 bg-amber-600/95 text-white hover:bg-amber-700">
                        {'₹'}
                        {food.priceLevel === 1 && (
                          <h4>less than 200</h4>
                        )}
                        {food.priceLevel === 2 && (
                          <h4> 200-500</h4>
                        )}
                        {food.priceLevel === 3 && (
                          <h4> 500-1000</h4>
                        )}
                        {food.priceLevel === 4 && (
                          <h4> 1000+</h4>
                        )}
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-amber-800 group-hover:text-amber-600 transition-colors line-clamp-1">{food.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-stone-600">{food.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-start gap-2 text-stone-600 mb-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-amber-700 flex-shrink-0" />
                      <span className="text-sm line-clamp-2">{food.location}</span>
                    </div>

                    {food.types.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {food.types.slice(0, 2).map((type, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{type.replace(/_/g, ' ')}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {hasMore && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
            <Button onClick={loadMore} disabled={loadingMore} size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
              {loadingMore ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  Load More
                  <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </Button>
          </motion.div>
        )}

        {!hasMore && foodCenters.length > 6 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-stone-500 text-sm mt-8">
            You've reached the end of the list
          </motion.div>
        )}

        {foodCenters.length === 0 && !loading && !error && (
          <div className="text-center py-20">
            <p className="text-stone-600 text-lg">No food centers found</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

// Details View Component
const FoodCenterDetails = ({ placeId, onBack }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDetails();
  }, [placeId]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:8080/food-center?place_id=${placeId}`);
      if (!response.ok) throw new Error('Failed to fetch food center details');
      const data = await response.json();
      setDetails(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSkeleton />;

  if (error || !details) return <ErrorAlert message={error || 'Failed to load details'} retry={onBack} />;

  let priceLevel = details.price_level ? '₹'.repeat(details.price_level) : 'N/A';

  const photos = details.photos?.slice(0, 6) || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-6 hover:bg-amber-100">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
        </Button>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <Card className="overflow-hidden shadow-2xl border-0">
            {/* Photo Gallery */}
            {photos.length > 0 && (
              <div className={`grid gap-2 p-2 bg-stone-50 ${photos.length === 1 ? 'grid-cols-1' : photos.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {photos.map((photo, idx) => (
                  <div key={idx} className={`relative overflow-hidden rounded-lg ${idx === 0 && photos.length > 2 ? 'col-span-2 row-span-2 h-96' : 'h-48'}`}>
                    <img
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${photo.photo_reference}&key=AIzaSyCKTTfJD5_TERQvfVR-XimF7c2GJnBekC8`}
                      alt={`${details.name} photo ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}

            <CardHeader className="space-y-6 pb-6">
              <div>
                <CardTitle className="text-4xl md:text-5xl bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent mb-3">{details.name}</CardTitle>
                {details.editorial_summary?.overview && (
                  <CardDescription className="text-base leading-relaxed text-stone-600">{details.editorial_summary.overview}</CardDescription>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {details.rating && (
                  <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 fill-amber-600 text-amber-600" />
                        <span className="font-semibold text-amber-800">Rating</span>
                      </div>
                      <div className="text-3xl font-bold text-stone-800">{details.rating}</div>
                      <div className="text-sm text-stone-600 mt-1">{details.user_ratings_total || 0} reviews</div>
                    </CardContent>
                  </Card>
                )}

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-green-800 flex items-center gap-1">Price Level</span>
                    </div>
                    <div className="text-3xl font-bold text-stone-800">{priceLevel}</div>
                  </CardContent>
                </Card>

                {details.opening_hours && (
                  <Card className={`bg-gradient-to-br border-0 shadow-sm ${details.opening_hours.open_now ? 'from-blue-50 to-cyan-50' : 'from-red-50 to-rose-50'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className={`w-5 h-5 ${details.opening_hours.open_now ? 'text-blue-700' : 'text-red-700'}`} />
                        <span className={`font-semibold ${details.opening_hours.open_now ? 'text-blue-800' : 'text-red-800'}`}>Status</span>
                      </div>
                      <div className={`text-3xl font-bold ${details.opening_hours.open_now ? 'text-green-600' : 'text-red-600'}`}>
                        {details.opening_hours.open_now ? 'Open' : 'Closed'}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-96 mx-auto mb-4" />
        <Skeleton className="h-6 w-64 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-56 w-full" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>  
    </div>
  </div>
);

// Error Alert Component
const ErrorAlert = ({ message, retry }) => (
  <div className="flex items-center justify-center min-h-screen p-4">
    <Alert variant="destructive" className="max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="mt-2">
        {message}
        <Button onClick={retry} variant="outline" className="w-full mt-4">Try Again</Button>
      </AlertDescription>
    </Alert>
  </div>
);

export default FoodCenter;
