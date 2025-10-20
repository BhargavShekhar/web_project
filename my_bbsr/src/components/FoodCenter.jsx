import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {  MapPin} from 'lucide-react';
import {motion} from 'framer-motion'
const FoodCenter = () => {

      const foodCenters = [
    {
      name: "Dalma",
      description: "Authentic Odia cuisine with traditional ambiance",
      location: "Saheed Nagar",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop"
    },
    {
      name: "Truptee Restaurant",
      description: "Famous for seafood and local delicacies",
      location: "Old Town",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop"
    },
    {
      name: "Bhojohori Manna",
      description: "Bengali and Odia fusion cuisine",
      location: "Janpath",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop"
    },
    {
      name: "The Zaika",
      description: "Multi-cuisine with rooftop dining",
      location: "Chandrasekharpur",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
    },
    {
      name: "Tangerine",
      description: "Fine dining with continental menu",
      location: "Nayapalli",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
    },
    {
      name: "Biryani Box",
      description: "Best biryani in town",
      location: "Kharavel Nagar",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop"
    }
  ];

  return (
    <section id="food" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">Famous Food Centers</h2>
            <p className="text-lg text-stone-600">Savor the authentic flavors of Bhubaneswar</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodCenters.map((food, index) => (
              <motion.div
                key={food.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-amber-800">{food.name}</CardTitle>
                    <CardDescription>{food.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-stone-600">
                      <MapPin className="w-4 h-4 mr-2 text-amber-700" />
                      <span className="text-sm">{food.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default FoodCenter