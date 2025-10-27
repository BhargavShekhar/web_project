import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react'; // Import a star icon

const EngineeringCollege = () => {
  const colleges = [
  {
    name: "CV Raman Global University",
    logo: "https://theadmissiongroup.com/wp-content/uploads/2023/10/16493229375.jpg",
    description: "CV Raman Global University, a reputed institution offering quality engineering education with strong placements.",
    rating: 4.4,
    rank: "State Rank: 5",
    website: "https://cvraman.edu.in"
  },
  {
    name: "IIT Bhubaneswar",
    logo: "https://bsmedia.business-standard.com/_media/bs/img/article/2018-11/05/full/1541434894-1153.jpg",
    description: "Indian Institute of Technology, renowned for research and innovation",
    rating: 4.7,
    rank: "NIRF Rank: 22",
    website: "https://iitbbs.ac.in"
  },
  {
    name: "KIIT University",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyGgiRKTJi7IchoUIz9rxViHjagurBrJy4mQ&s",
    description: "Kalinga Institute of Industrial Technology, deemed university with excellent placement",
    rating: 4.3,
    rank: "NIRF Rank: 28",
    website: "https://kiit.ac.in"
  },
  {
    name: "SOA University",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR56FdNgDUsHqdagxNlOOtmSPLyu0kGVH_sGA&s",
    description: "Siksha 'O' Anusandhan, deemed university known for engineering and medical programs",
    rating: 4.2,
    rank: "NIRF Rank: 35",
    website: "https://soa.ac.in"
  },
  {
    name: "CET Bhubaneswar",
    logo: "https://media.collegedekho.com/media/img/institute/crawled_images/None/DFGDGDFGDF.jpg",
    description: "Global University and Technology, government engineering college",
    rating: 4.0,
    rank: "State Rank: 2",
    website: "https://outr.ac.in/"
  },
  {
    name: "ITER, SOA",
    logo: "https://images.squarespace-cdn.com/content/57713a8e2994cae381dd86fe/75119539-209d-48e4-83e9-4134ada499d7/iter+gate.jpg?format=1500w&content-type=image%2Fjpeg",
    description: "Institute of Technical Education and Research, top private engineering college",
    rating: 4.1,
    rank: "State Rank: 3",
    website: "https://www.soa.ac.in/iter"
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
              <Card className="hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <CardHeader className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <img
                      src={college.logo}
                      alt={college.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-xl text-amber-800">{college.name}</CardTitle>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.round(college.rating) ? 'text-amber-600' : 'text-stone-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-stone-600">{college.rating}</span>
                      </div>
                    </div>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-semibold">
                    {college.rank}
                  </span>
                </CardHeader>
                <CardContent className="mt-2 flex-1 flex flex-col justify-between">
                  <p className="text-stone-600 mb-4">{college.description}</p>
                  {college.website !== '#' && (
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-amber-700 hover:text-amber-800 font-medium mt-auto"
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
  );
};

export default EngineeringCollege;
