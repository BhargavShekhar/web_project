import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { historyData } from "../data/historyData";

const HistorySection = () => {
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [showFullEvents, setShowFullEvents] = useState(false);

  // --- ANCIENT HISTORY DATA (UNCHANGED) ---
  const historyDataParagraphs = [
    {
      heading: "Ancient Kalinga and Ashoka's Legacy (c. 3rd Century BCE)",
      content: "The region around Bhubaneswar was the heartland of the **Kalinga Kingdom**. Its history is scarred by the devastating **Kalinga War (c. 261 BCE)**, which profoundly impacted Emperor Ashoka. The sheer brutality of the conflict led him to renounce violence and adopt Buddhism. The famous **Dhauli Shanti Stupa**, built near the historic battleground, and the nearby Rock Edicts stand as solemn markers of this crucial turning point in Indian history."
    },
    {
      heading: "The Temple Building Epoch (7th - 13th Centuries)",
      content: "Bhubaneswar is most famously known for its **Temple Architecture**, earning it the moniker 'Temple City of India.' Under the rule of the Keshari and Ganga dynasties, the city became a vibrant religious hub with thousands of temples. Key examples include the majestic **Lingaraja Temple**, a masterpiece of the Kalinga style, and the beautifully carved **Rajarani Temple**, showcasing the zenith of Odia architectural genius."
    },
    {
      heading: "Medieval Decline and Colonial Period",
      content: "Following the decline of the independent Odia dynasties, the city went through periods of invasion and neglect, leading many of its temples to fall into disrepair. However, the architectural legacy remained. During the British Raj, the city's archaeological value was recognized, leading to the preservation of many ancient structures, setting the stage for its modern resurrection."
    },
  ];

  // --- MODERN EVENTS DATA (SORTED BY YEAR) ---
  const allImportantEvents = [
    {
      title: "Nandankanan Zoological Park Established (1960)",
      description:
        "Literally meaning 'The Garden of Heaven,' Nandankanan was inaugurated, marking a crucial step in modern conservation. It later gained international fame for successfully breeding the rare **White Tiger** from normal-coloured parents.",
      image:
        "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/01/04/8aabb86d651d49096c91528ac256eaee_1000x1000.jpg",
    },
    {
      title: "Ekamra Kanan (2009)",
      description:
        "The conversion of the old Forest Park into Ekamra Kanan, a large botanical garden, established a vital green lung and recreational space, boosting the city's modern infrastructure for leisure and ecology.",
      image:
        "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/01/04/90794f5cb9aada23d8dad93bd11d05ad_1000x1000.jpg",
    },
    {
      title: "AIIMS Bhubaneswar (2012)",
      description:
        "The All India Institute of Medical Sciences (AIIMS) became fully operational, significantly advancing healthcare, medical education, and research capabilities, cementing the city's status as a regional knowledge hub.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFW6yp5vVkAHzdBeHQML03y7IWPwC-AmJmyw&s",
    },
    {
      title: "2018 Men's Hockey World Cup",
      description:
        "Bhubaneswar proudly hosted the 2018 Men’s Hockey World Cup at Kalinga Stadium, earning global praise for its organization and hospitality. The event showcased Odisha’s growing sports infrastructure.",
      image:
        "https://pbs.twimg.com/media/Gi3sVJHXIAA4_Ux.jpg:large",
    },
    {
      title: "Cyclone Fani Recovery (2019)",
      description:
        "Cyclone Fani struck Odisha, causing widespread destruction. Bhubaneswar’s swift recovery efforts and resilient spirit were applauded worldwide, setting an example for urban disaster management.",
      image:
        "https://ndrf.gov.in/sites/default/files/images%20%281%29.jpg",
    },
    {
      title: "Smart City Mission",
      description:
        "As part of India’s Smart City initiative, Bhubaneswar has been transformed into a model of urban planning, sustainable transport, and digital governance — ranked among India’s top smart cities.",
      // Note: Placing Smart City Mission (launched 2015) last as it represents an ongoing, continuous transformation, making it a fitting conclusion to the modern timeline.
      image:
        "https://www.orissapost.com/wp-content/uploads/2022/05/bhubaneswar.jpg",
    },
  ];

  const initialEventCount = 3;
  const eventsToShow = showFullEvents
    ? allImportantEvents
    : allImportantEvents.slice(0, initialEventCount);

  // Animation Variants (UNCHANGED)
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay },
    }),
  };

  return (
    <section id="history" className="relative overflow-hidden bg-slate-50">
      {/* Floating Gradient Orbs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover opacity-10"
        style={{
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/d/d7/Lingaraja_Temple%2C_Bhubaneswar.jpg')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-slate-50/70 to-white"></div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-400 bg-clip-text text-transparent mb-6"
        >
          Discover Bhubaneswar
        </motion.h2>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
          className="text-lg md:text-xl text-center text-slate-600 max-w-3xl mx-auto mb-16"
        >
          The Timeless Blend of <span className="font-semibold text-amber-700">Sacred Architecture</span> and <span className="font-semibold text-slate-800">Modern Vision.</span>
        </motion.p>

        {/* Card Container */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.5}
          className="bg-white/90 backdrop-blur-xl border border-amber-100 shadow-2xl rounded-[40px] p-8 md:p-14 relative overflow-hidden"
        >
          {/* Decorative Line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-16 bg-gradient-to-b from-amber-400 to-transparent rounded-b-full"></div>

          {/* Intro Paragraph */}
          <p className="text-lg md:text-2xl text-slate-700 leading-relaxed mb-10">
            Known as the <span className="font-bold text-amber-700">Temple City of India</span>, Bhubaneswar is a
            living museum — from the sacred stones of ancient Kalinga to its rise as a <span className="font-semibold text-slate-800">Smart City of the future</span>.
          </p>

          <AnimatePresence>
            {showFullHistory && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
              >
                {/* Timeline - TRACING THE ROOTS (UNCHANGED) */}
                <h3 className="text-4xl font-bold text-slate-800 mt-10 mb-10 text-center">
                  Tracing the Roots
                </h3>
                <div className="space-y-10 border-l-4 border-amber-300 pl-8">
                  {historyDataParagraphs.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      className="relative bg-gradient-to-br from-white to-amber-50 p-6 rounded-2xl shadow-md hover:shadow-lg border-t-4 border-amber-400"
                    >
                      <div className="absolute -left-7 top-6 w-4 h-4 bg-amber-500 rounded-full border-2 border-white"></div>
                      <h4 className="text-2xl font-semibold text-amber-800 mb-3">
                        {item.heading}
                      </h4>
                      <p className="text-slate-700 leading-relaxed">{item.content}</p>
                    </motion.div>
                  ))}
                </div>

                {/* --- MODERN EVENTS (NEW TIMELINE UI with Sorted Data) --- */}
                <h3 className="text-4xl font-bold text-slate-800 mt-20 mb-10 text-center">
                  Transformational Events
                </h3>

                <div className="relative mx-auto max-w-4xl pt-4">
                    {/* The main vertical timeline line (Hidden on smaller screens) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-2 border-r-2 border-dashed border-amber-400/50"></div>

                    {eventsToShow.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`mb-12 flex relative ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
                        >
                            {/* Timeline Dot */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2">
                                <div className="w-5 h-5 bg-amber-600 border-4 border-white rounded-full mt-4 shadow-xl"></div>
                            </div>
                            
                            {/* Event Card */}
                            <div
                                className={`w-full md:w-[45%] rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-amber-200 border border-amber-100 group transition-all duration-300 ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                            >
                                <div className={`relative flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                                    
                                    {/* Image Section */}
                                    <div className="relative md:w-1/2">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-48 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 transition"></div>
                                    </div>
                                    
                                    {/* Text Section (Always visible) */}
                                    <div className="p-5 md:w-1/2 flex flex-col justify-center">
                                        <h4 className="text-xl font-bold text-amber-700 mb-2">{item.title}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* Show More Events Button */}
                {allImportantEvents.length > initialEventCount && (
                  <div className="text-center mt-10">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setShowFullEvents(!showFullEvents)}
                      className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full shadow-lg transition-all"
                    >
                      {showFullEvents ? (
                        <>
                          <ChevronUp size={18} />
                        </>
                      ) : (
                        <>
                          <ChevronDown size={18} />
                        </>
                      )}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explore Button */}
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowFullHistory(!showFullHistory);
                if (showFullHistory) setShowFullEvents(false);
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-xl transition-all"
            >
              {showFullHistory ? (
                <>
                  View Less History <ChevronUp size={20} />
                </>
              ) : (
                <>
                  Explore Full History <ChevronDown size={20} />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HistorySection;