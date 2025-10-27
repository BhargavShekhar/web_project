import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, MapPin, AlertCircle, Star, Globe, ExternalLink, Phone } from "lucide-react";

const TempleDetails = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    fetchTempleDetails();
  }, [placeId]);

  const fetchTempleDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:8080/temple-details?place_id=${placeId}`
      );
      if (!response.ok) throw new Error("Failed to fetch temple details");

      const data = await response.json();

      const photos =
        data.photos?.slice(0, 6).map(
          (photo) =>
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${photo.photo_reference}&key=AIzaSyCKTTfJD5_TERQvfVR-XimF7c2GJnBekC8`
        ) || [
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=800&fit=crop",
        ];

      setTemple({
        name: data.name,
        photos,
        rating: data.rating || "N/A",
        userRatingsTotal: data.user_ratings_total || 0,
        address: data.formatted_address,
        openNow: data.opening_hours?.open_now,
        weekdayText: data.opening_hours?.weekday_text || [],
        website: data.website,
        phone: data.formatted_phone_number,
        types: data.types || [],
        description:
          data.description ||
          "A sacred place of worship and spiritual significance.",
        reviews: data.reviews || [],
        priceLevel: data.price_level,
        location: data.geometry?.location,
      });
    } catch (err) {
      setError(err.message);
      console.error("Error fetching temple details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center"
      >
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-amber-600 animate-spin mb-6 mx-auto" />
          <p className="text-stone-600 text-xl font-medium">
            Loading temple details...
          </p>
        </div>
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-4"
      >
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md w-full shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-red-800">
              Error Loading Details
            </h3>
          </div>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/temples")}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={fetchTempleDetails}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </motion.div>
    );

  if (!temple) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-b from-amber-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative h-96 md:h-[32rem] rounded-3xl overflow-hidden shadow-2xl bg-stone-200">
            <img
              src={temple.photos[selectedImage]}
              alt={temple.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=800&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {temple.photos.length > 1 && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4">
              {temple.photos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-20 md:h-24 rounded-xl overflow-hidden transition-all ${
                    selectedImage === idx
                      ? "ring-4 ring-amber-500 shadow-lg scale-105"
                      : "opacity-70 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <img
                    src={photo}
                    alt={`${temple.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Temple Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            {temple.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-4 pb-6 border-b border-stone-200 mb-6">
            <div className="flex items-center gap-2 bg-amber-50 px-5 py-3 rounded-full">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              <span className="font-bold text-2xl text-stone-800">
                {temple.rating}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(temple.rating)
                        ? "text-amber-500 fill-amber-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-stone-600 text-sm">
                {temple.userRatingsTotal.toLocaleString()} reviews
              </span>
            </div>
          </div>

          {/* Status Badge & Price */}
          <div className="mb-6 flex gap-4 flex-wrap">
            {temple.openNow !== undefined && (
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  temple.openNow
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {temple.openNow ? "Open Now" : "Closed"}
              </span>
            )}
            {temple.priceLevel !== undefined && (
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-amber-100 text-amber-800">
                {[
                  "Free",
                  "Inexpensive",
                  "Moderate",
                  "Expensive",
                  "Very Expensive",
                ][temple.priceLevel] || "Price Info"}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-3">About</h2>
            <p className="text-stone-700 text-lg leading-relaxed whitespace-pre-line">
              {showFullDesc
                ? temple.description
                : temple.description?.slice(0, 400) + "..."}
            </p>
            {temple.description.length > 400 && (
              <button
                className="text-amber-600 font-semibold mt-2 hover:underline"
                onClick={() => setShowFullDesc(!showFullDesc)}
              >
                {showFullDesc ? "Show Less" : "Read More"}
              </button>
            )}
          </div>

          {/* Opening Hours */}
          {temple.weekdayText?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-stone-800 mb-3">
                Opening Hours
              </h2>
              <ul className="list-disc list-inside text-stone-700">
                {temple.weekdayText.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Reviews */}
          {temple.reviews.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-stone-800 mb-3">
                Visitor Reviews
              </h2>
              <div className="space-y-4">
                {temple.reviews.slice(0, 5).map((review, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-stone-50 rounded-xl shadow-md"
                  >
                    <p className="font-semibold">{review.author_name}</p>
                    <div className="flex gap-1 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-amber-500 fill-amber-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-stone-700">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Map & Contact */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">
              Location & Contact
            </h2>

            {temple.location && (
              <iframe
                title="Temple Map"
                width="100%"
                height="300"
                className="rounded-xl mb-4"
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCKTTfJD5_TERQvfVR-XimF7c2GJnBekC8&q=${temple.name} ${temple.address}`}
              ></iframe>
            )}

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                temple.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition"
            >
              Get Directions
            </a>

            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl">
                <MapPin className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                <p className="text-stone-700 leading-relaxed">{temple.address}</p>
              </div>

              {temple.phone && (
                <a
                  href={`tel:${temple.phone}`}
                  className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors group"
                >
                  <Phone className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-stone-700 group-hover:text-amber-700 font-medium">
                    {temple.phone}
                  </span>
                </a>
              )}

              {temple.website && (
                <a
                  href={temple.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span className="text-stone-700 group-hover:text-amber-700 font-medium">
                      Visit Website
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-amber-600" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TempleDetails;
