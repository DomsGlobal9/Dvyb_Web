import React from "react";

const OffersZone = () => {
  const categories = [
    {
      title: "Winter Wear",
      subtitle: "Dress up in a warmer vibe",
      offer: "UPTO 50% OFF",
      img: "https://via.placeholder.com/400x400",
      bg: "bg-blue-900 text-white",
    },
    {
      title: "Printed T-Shirt",
      subtitle: "New Designs Every Week",
      offer: "UPTO 40% OFF",
      img: "https://via.placeholder.com/400x400",
      bg: "bg-pink-200 text-gray-900",
    },
    {
      title: "Cargo Joggers",
      subtitle: "For Ultimate Comfort",
      offer: "UPTO 50% OFF",
      img: "https://via.placeholder.com/400x400",
      bg: "bg-gray-100 text-gray-900",
    },
    {
      title: "Women Wear",
      subtitle: "Street Style Icon",
      offer: "FLAT 60% OFF",
      img: "https://via.placeholder.com/400x400",
      bg: "bg-white text-gray-900",
    },
    {
      title: "Oversized T-Shirts",
      subtitle: "Street Style Icon",
      offer: "FLAT 60% OFF",
      img: "https://via.placeholder.com/400x400",
      bg: "bg-yellow-400 text-gray-900",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Row */}
        <div className={`${categories[0].bg} rounded-xl p-6 flex flex-col justify-between`}>
          <h3 className="text-2xl font-bold">{categories[0].title}</h3>
          <p>{categories[0].subtitle}</p>
          <p className="mt-2 font-semibold">{categories[0].offer}</p>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">SHOP NOW</button>
        </div>

        <div className={`${categories[1].bg} rounded-xl p-6`}>
          <h3 className="text-2xl font-bold">{categories[1].title}</h3>
          <p>{categories[1].subtitle}</p>
          <p className="mt-2 font-semibold">{categories[1].offer}</p>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">SHOP NOW</button>
        </div>

        <div className={`${categories[2].bg} rounded-xl p-6`}>
          <h3 className="text-2xl font-bold">{categories[2].title}</h3>
          <p>{categories[2].subtitle}</p>
          <p className="mt-2 font-semibold">{categories[2].offer}</p>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">SHOP NOW</button>
        </div>

        {/* Second Row */}
        <div className={`${categories[3].bg} rounded-xl p-6 col-span-1 sm:col-span-2`}>
          <h3 className="text-2xl font-bold">{categories[3].title}</h3>
          <p>{categories[3].subtitle}</p>
          <p className="mt-2 font-semibold">{categories[3].offer}</p>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">SHOP NOW</button>
        </div>

        <div className={`${categories[4].bg} rounded-xl p-6`}>
          <h3 className="text-2xl font-bold">{categories[4].title}</h3>
          <p>{categories[4].subtitle}</p>
          <p className="mt-2 font-semibold">{categories[4].offer}</p>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">SHOP NOW</button>
        </div>
      </div>
    </div>
  );
};

export default OffersZone;
