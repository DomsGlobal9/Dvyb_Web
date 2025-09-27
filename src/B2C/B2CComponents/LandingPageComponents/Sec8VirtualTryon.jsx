import React from "react";
import { Star, ArrowRight } from "lucide-react";
import saree from "../../../assets/B2cAssets/LandingPageImges/sareepink.png"

const StatsCard = ({ value, label, sublabel }) => (
  <div className=" p-4 text-center">
    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
      {value}
    </div>
    <div className="text-xs text-gray-300 font-medium">{label}</div>
    <div className="text-xs text-gray-400">{sublabel}</div>
  </div>
);

const ProductCard = ({
  image,
  rating,
  reviews,
  fitted,
  name,
  currentPrice,
  originalPrice,
  savePercent,
  marketDemand,
  demandPercent,
}) => (
  <div className="bg-black border border-gray-700 p-0 w-[320px] lg:w-[350px] flex-shrink-0">
    <div className="relative mb-4">
      <img
        src={image}
        alt={name}
        className="w-full h-80 lg:h-96 object-cover bg-gray-200"
      />
    </div>

    <div className="px-4 pb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-600"
                }
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs ml-2">
            ({rating}.{reviews})
          </span>
        </div>
        <span className="text-gray-400 text-xs">{fitted} FITTED</span>
      </div>

      <h3 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wide">
        {name}
      </h3>

      <div className="flex items-center gap-3 mb-2">
        <span className="text-white font-bold text-lg">{currentPrice}</span>
        <span className="text-gray-500 line-through text-sm">
          {originalPrice}
        </span>
      </div>

      <div className="text-teal-400 text-xs font-medium mb-4">
        {savePercent}
      </div>

      <div className="border border-gray-700 p-3">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-gray-400">MARKET DEMAND</span>
          <span className="text-teal-400 font-medium">{demandPercent}</span>
        </div>
        <div className="w-full bg-gray-800 h-1">
          <div
            className="bg-teal-500 h-1"
            style={{ width: `${marketDemand}%` }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

function VirtualTryonSection8() {
  const products = [
    {
      image:
        saree,
      rating: 4,
      reviews: 9,
      fitted: 1967,
      name: "RED DESIGNER LEHENGA",
      currentPrice: "$325.000",
      originalPrice: "$425.000",
      savePercent: "SAVE 24%",
      marketDemand: 80,
      demandPercent: "+38%",
    },
    {
      image:
        saree,
      rating: 4,
      reviews: 9,
      fitted: 1967,
      name: "RED DESIGNER LEHENGA",
      currentPrice: "$325.000",
      originalPrice: "$425.000",
      savePercent: "SAVE 24%",
      marketDemand: 80,
      demandPercent: "+38%",
    },
    {
      image:
        saree,
      rating: 4,
      reviews: 9,
      fitted: 1967,
      name: "RED DESIGNER LEHENGA",
      currentPrice: "$325.000",
      originalPrice: "$425.000",
      savePercent: "SAVE 24%",
      marketDemand: 80,
      demandPercent: "+38%",
    },
    {
      image:
        saree,
      rating: 4,
      reviews: 9,
      fitted: 1967,
      name: "RED DESIGNER LEHENGA",
      currentPrice: "$325.000",
      originalPrice: "$425.000",
      savePercent: "SAVE 24%",
      marketDemand: 80,
      demandPercent: "+38%",
    },
    {
      image:
        saree,
      rating: 4,
      reviews: 9,
      fitted: 1967,
      name: "RED DESIGNER LEHENGA",
      currentPrice: "$325.000",
      originalPrice: "$425.000",
      savePercent: "SAVE 24%",
      marketDemand: 80,
      demandPercent: "+38%",
    },
  ];

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "Outfit" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-6">
        <button className="px-10 py-6 border border-gray-700 text-white align-center bg-[#0A0E14] tracking-wider text-sm md:text-base">
          TRENDING WARDROBE
        </button>
       </div>
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Trending in
            <br />
            Virtual Try-On
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            This week, the outfits that have been tried-on the most by our users
            are truly remarkable! From stylish dresses to trendy casual wear,
            everyone seems to be exploring new looks.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px  mb-8 md:mb-12 border-[2px] border-[#212833]">
          <StatsCard
            value="12,847"
            label="DAILY VIRTUAL FITTINGS"
            sublabel="Active"
          />
          <StatsCard value="847" label="TRENDING ITEMS" sublabel="Live" />
          <StatsCard value="99.2%" label="PRECISION RATE" sublabel="Accuracy" />
          <StatsCard value="1,247" label="GLOBAL USERS" sublabel="Online" />
        </div>

        {/* Products Horizontal Scroll */}
        <div className="mb-8 md:mb-12">
          <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center space-y-6">
          <div className="text-gray-400 text-sm font-mono">
            LIVE MARKET DATA UPDATED: 17:36:54
          </div>
          <button className="bg-teal-500 hover:bg-teal-600 text-black font-medium px-8 py-4 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto">
            EXPLORE TRENDING COLLECTION
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default VirtualTryonSection8;