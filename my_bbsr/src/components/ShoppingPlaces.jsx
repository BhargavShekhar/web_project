import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { MapPin, Clock, Tag } from "lucide-react";

const shoppingPlaces = [
  // --- Malls ---
  {
    name: "Esplanade One Mall",
    type: "Mall",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6V5d0LhYnZtlfFzUXzOujZpOZ2ExiAvHRA&s",
    description:
      "One of the largest malls in Bhubaneswar with international brands, multiple food joints, and entertainment options. Perfect for a full day out.",
    location: "Patia",
    timing: "10:00 AM - 10:00 PM",
  },
  {
    name: "DN Regalia",
    type: "Mall",
    image: "https://dnhomes.com/wp-content/uploads/2024/03/regalia.jpeg",
    description:
      "A premium shopping destination known for high-end retail brands, luxurious ambiance, and a popular multiplex cinema.",
    location: "Patrapada",
    timing: "10:30 AM - 10:30 PM",
  },
  {
    name: "Utkal Galleria",
    type: "Mall",
    image: "https://utkalgalleria.com/wp-content/uploads/2023/09/Hone-Bnr-m.webp",
    description:
      "A massive mixed-use complex featuring one of the city's biggest hypermarkets, lifestyle stores, and dining options.",
    location: "Laxmisagar",
    timing: "10:00 AM - 10:00 PM",
  },
  {
    name: "Pal Heights Mall",
    type: "Mall",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTykjDFXXVqoLC49ogsinoogMeVmtXXaUPmbAYG086CHIrxRznj5rAh20It51TdI2sN1DM&usqp=CAU",
    description: "Centrally located and popular among locals, offering a focused mix of fashion retail, essential services, and quick-service restaurants in a convenient setting.",
    location: "Jayadev Vihar",
    timing: "10:00 AM - 9:30 PM",
  },
  {
    name: "Symphony Mall",
    type: "Mall",
    image: "https://odishacompany.com/wp-content/uploads/2020/12/symphony-mall-bhubaneshwar-malls-mlmfqsdt2n1.jpg",
    description: "A modern, medium-sized mall providing a balance of fashion, food, and family entertainment options. It serves the surrounding residential and commercial zones effectively.",
    location: "Chandrasekharpur",
    timing: "10:00 AM - 10:00 PM",
  },
  {
    name: "Forum Mart",
    type: "Mall",
    image:
      "https://static.toiimg.com/thumb/msid-58339308,width=1200,height=900/58339308.jpg",
    description:
      "A centrally located shopping destination with retail stores, a food court, and a movie theater.",
    location: "Kharavel Nagar",
    timing: "10:00 AM - 10:00 PM",
  },

  // --- Markets ---
  {
    name: "Ekamra Haat",
    type: "Handicrafts Market",
    image: "https://static.toiimg.com/thumb/msid-58339382,width=1200,height=900/58339382.jpg", // Using a relevant image if possible, otherwise placeholder
    description:
      "A permanent handicrafts and cultural market showcasing Odisha’s rich heritage: Pattachitra, handlooms, stone carvings, and traditional cuisine.",
    location: "Near AG Square",
    timing: "10:00 AM - 8:30 PM",
  },
  {
    name: "Gandhi Market",
    type: "Street Market",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBjg8YsKOkruU-S_9hr1zXhhi1NfR4Gi0CxA&s", // Using a relevant image if possible, otherwise placeholder
    description:
      "A bustling street market known for trendy clothes, budget-friendly shopping, and vibrant street food, especially near Ramadevi University.",
    location: "Jayadev Vihar",
    timing: "5:00 PM - 11:00 PM",
  },
  {
    name: "BMC Market",
    type: "Local Market",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoiDmG8TCMt-4hcudIMiSgidIpqbvlNDBnAg&s",
    description:
      "A bustling market offering traditional Odia clothes, handicrafts, electronics, and some of the city's best street food.",
    location: "Old Town",
    timing: "9:00 AM - 8:00 PM",
  },
  {
    name: "Unit-1 Market",
    type: "Market",
    image: "https://www.mappls.com/place/23BF4F_1645100145950_1.jpeg",
    description:
      "A primary local hub with groceries, electronics, and daily essentials — a convenient shopping destination for residents.",
    location: "Unit-1",
    timing: "9:00 AM - 8:00 PM",
  },
  {
    name: "Unit-2 Market",
    type: "Market",
    image: "https://static.toiimg.com/photo/58339986/.jpg",
    description:
      "A busy market known for clothing, footwear, and accessories — ideal for affordable shopping.",
    location: "Unit-2",
    timing: "9:00 AM - 8:00 PM",
  },
  {
    name: "Unit-3 Market",
    type: "Market",
    image:
      "https://content.jdmagicbox.com/comp/def_content_category/markets/2-markets-2-gl1cz.jpg",
    description:
      "Famous for wholesale textiles and budget-friendly goods. A local favorite for daily shopping.",
    location: "Unit-3",
    timing: "9:00 AM - 8:00 PM",
  },
];
const CARD_BASE_CLASSES ="group flex flex-col h-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-4 border-transparent hover:border-amber-400 cursor-pointer";

const ShoppingPlaces = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const malls = shoppingPlaces.filter((place) => place.type === "Mall");
  const markets = shoppingPlaces.filter((place) => place.type !== "Mall");

  return (
    <section id="shopping" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-stone-800 text-center mb-4 tracking-tight">
          Shop the City 🛍
        </h2>
        <p className="text-xl text-center text-stone-500 mb-16 max-w-2xl mx-auto">
          Explore malls and markets in Bhubaneswar side by side.
        </p>

        {/* Two-column layout with vertical divider */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          {/* Divider line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-amber-300 transform -translate-x-1/2"></div>

          {/* Left Column: Malls */}
          <div className="flex flex-col items-stretch">
            <h3 className="text-3xl font-bold text-amber-700 mb-6 text-center border-b-2 border-amber-300 pb-2">
              Malls 🏢
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
              {malls.map((place) => (
                <Card
                  key={place.name}
                  onClick={() => setSelectedPlace(place)}
                  className={CARD_BASE_CLASSES}
                >
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                  </div>

                  <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-stone-800 group-hover:text-amber-700 transition-colors">
                        {place.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 text-sm text-stone-500">
                        <Tag className="w-4 h-4 text-amber-600" />
                        {place.type}
                      </CardDescription>
                    </div>

                    <div className="pt-2 border-t border-stone-100 space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-stone-600 text-sm">
                        <MapPin className="w-4 h-4 text-amber-700" />
                        <span>{place.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-600 text-sm">
                        <Clock className="w-4 h-4 text-amber-700" />
                        <span>{place.timing}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              ))}
            </div>
          </div>

          {/* Right Column: Markets */}
          <div className="flex flex-col items-stretch">
            <h3 className="text-3xl font-bold text-amber-700 mb-6 text-center border-b-2 border-amber-300 pb-2">
              Markets 🏬
            </h3>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
    {markets.map((place) => (
      <Card className="flex flex-col h-full"
                  key={place.name}
                  onClick={() => setSelectedPlace(place)}
                  className={CARD_BASE_CLASSES}
                >
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                  </div>

                  <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-stone-800 group-hover:text-amber-700 transition-colors">
                        {place.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 text-sm text-stone-500">
                        <Tag className="w-4 h-4 text-amber-600" />
                        {place.type}
                      </CardDescription>
                    </div>

                    <div className="pt-2 border-t border-stone-100 space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-stone-600 text-sm">
                        <MapPin className="w-4 h-4 text-amber-700" />
                        <span>{place.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-600 text-sm">
                        <Clock className="w-4 h-4 text-amber-700" />
                        <span>{place.timing}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              ))}
            </div>
          </div>
        </div>

        {/* Detail Sheet */}
        <Sheet
          open={!!selectedPlace}
          onOpenChange={() => setSelectedPlace(null)}
        >
          {selectedPlace && (
            <SheetContent
              side={selectedPlace.type === "Mall" ? "left" : "right"} // only when selectedPlace exists
              className="w-full sm:max-w-lg overflow-y-auto"
            >
              <SheetHeader className="pb-4">
                <SheetTitle className="text-3xl font-bold text-stone-800 border-b pb-2">
                  {selectedPlace.name}
                </SheetTitle>
                <SheetDescription className="text-lg text-amber-700 font-semibold flex items-center gap-2 pt-2">
                  <Tag className="w-5 h-5" />
                  {selectedPlace.type}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                <img
                  src={selectedPlace.image}
                  alt={selectedPlace.name}
                  className="w-full h-64 object-cover rounded-xl shadow-xl"
                />

                <div className="bg-stone-100 p-4 rounded-lg">
                  <h4 className="text-xl font-semibold text-stone-700 mb-2">
                    What to Expect:
                  </h4>
                  <p className="text-stone-600 leading-relaxed">
                    {selectedPlace.description}
                  </p>
                </div>

                <div className="space-y-3 text-stone-700">
                  <div className="flex items-center gap-4 p-3 bg-white border rounded-lg">
                    <MapPin className="w-6 h-6 text-amber-700 flex-shrink-0" />
                    <div>
                      <span className="font-semibold block">Location</span>
                      <span className="text-base">{selectedPlace.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-white border rounded-lg">
                    <Clock className="w-6 h-6 text-amber-700 flex-shrink-0" />
                    <div>
                      <span className="font-semibold block">Operating Hours</span>
                      <span className="text-base">{selectedPlace.timing}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          )}
        </Sheet>

      </div>
    </section>
  );
};

export default ShoppingPlaces;