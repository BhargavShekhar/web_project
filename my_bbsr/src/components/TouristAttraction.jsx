import React, { useState, useEffect } from 'react';
import {motion} from 'framer-motion'
const TouristAttraction = () => {

    const [currentCarousel, setCurrentCarousel] = useState(0);

      const attractions = [
    {
      name: "Nandankanan Zoological Park",
      description: "Famous zoo and botanical garden, home to white tigers and diverse wildlife",
      image: "https://i.ytimg.com/vi/ncvtMdBjt2s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCRWIKXk3k5droBXzZfYImXCVoqiQ"
    },
    {
      name: "Udayagiri & Khandagiri Caves",
      description: "Ancient Jain rock-cut caves dating back to 2nd century BCE",
      image: "https://bhubaneswartourism.in/images//tourist-places/udayagiri-and-khandagiri-caves-bhubaneswar/udayagiri-and-khandagiri-caves-bhubaneswar-india-tourism-history.jpg"
    },
    {
      name: "Dhauli Giri Hills",
      description: "Historic site of the Kalinga War with the famous peace pagoda",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/1c/9b/ca/shanti-stupa-dhauli-giri.jpg?w=1200&h=1200&s=1"
    },
    {
      name: "Odisha State Museum",
      description: "Rich collection of archaeological artifacts, manuscripts, and art",
      image: "https://odishatourism.gov.in/content/dam/tourism/home/discover/attractions/museum/odisha-state-museum/gallery/1.jpg"
    }
  ];
  return (
       <section id="attractions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">Tourist Attractions</h2>
            <p className="text-lg text-stone-600">Must-visit destinations in and around the city</p>
          </motion.div>

          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            {attractions.map((attraction, index) => (
              <motion.div
                key={attraction.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: currentCarousel === index ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{attraction.name}</h3>
                  <p className="text-lg text-stone-200 max-w-2xl">{attraction.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Carousel Controls */}
            <div className="absolute bottom-8 right-8 flex space-x-2">
              {attractions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCarousel(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentCarousel === index ? 'bg-amber-500 w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

  )
}

export default TouristAttraction