import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {motion} from 'framer-motion'
const EngineeringCollege = () => {

      const colleges = [
    {
      name: "NIT Rourkela",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop",
      description: "National Institute of Technology, one of India's premier engineering institutions",
      rating: 4.5,
      rank: "NIRF Rank: 16",
      website: "https://nitrkl.ac.in"
    },
    {
      name: "IIT Bhubaneswar",
      logo: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=100&h=100&fit=crop",
      description: "Indian Institute of Technology, renowned for research and innovation",
      rating: 4.7,
      rank: "NIRF Rank: 22",
      website: "https://iitbbs.ac.in"
    },
    {
      name: "KIIT University",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop",
      description: "Kalinga Institute of Industrial Technology, deemed university with excellent placement",
      rating: 4.3,
      rank: "NIRF Rank: 28",
      website: "https://kiit.ac.in"
    },
    {
      name: "SOA University",
      logo: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=100&h=100&fit=crop",
      description: "Siksha 'O' Anusandhan, deemed university known for engineering and medical programs",
      rating: 4.2,
      rank: "NIRF Rank: 35",
      website: "https://soa.ac.in"
    },
    {
      name: "CET Bhubaneswar",
      logo: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=100&h=100&fit=crop",
      description: "College of Engineering and Technology, government engineering college",
      rating: 4.0,
      rank: "State Rank: 2",
      website: "#"
    },
    {
      name: "ITER, SOA",
      logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=100&h=100&fit=crop",
      description: "Institute of Technical Education and Research, top private engineering college",
      rating: 4.1,
      rank: "State Rank: 3",
      website: "#"
    }
  ];


  return (
    <section id="colleges" className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">Top Engineering Colleges</h2>
            <p className="text-lg text-stone-600">Premier institutions shaping future engineers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {colleges.map((college, index) => (
              <motion.div
                key={college.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={college.logo}
                          alt={college.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <CardTitle className="text-xl text-amber-800">{college.name}</CardTitle>
                          <div className="flex items-center mt-1">
                            <div className="flex items-center text-amber-600">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(college.rating) ? 'fill-current' : ''
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-stone-600">{college.rating}</span>
                          </div>
                        </div>
                      </div>
                      <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-semibold">
                        {college.rank}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-600 mb-4">{college.description}</p>
                    {college.website !== '#' && (
                      <a
                        href={college.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-amber-700 hover:text-amber-800 font-medium"
                      >
                        Visit Website
                        <div className="w-4 h-4 ml-1" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default EngineeringCollege