import React from "react";
import { Star, ArrowRight } from "lucide-react";
import saree from "../../../assets/B2cAssets/LandingPageImges/sareepink.png"

import heart from "../../../assets/B2cAssets/LandingPageImges/heart.png"
import Bag from "../../../assets/B2cAssets/LandingPageImges/Bag.png"



const StatsCard = ({ value, label, sublabel }) => (
  <div className=" p-4 text-center">
      <div className="text-xs text-gray-400">{sublabel}</div>
    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
      {value}
    </div>
    <div className="text-xs text-gray-300 font-medium">{label}</div>
  
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
  Tryon,
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
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < rating
                    ? "fill-white text-white"
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

      <h3 className="text-white text-sm font-medium mb-3 uppercase tracking-wide">
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

     <div className="p-3">
  {/* TRY ON SCORE + Demand */}
  <div className="flex justify-between text-xs mb-2">
    <span className="text-[#3C8E9A]">TRY ON SCORE</span>
    <span className="py-1 font-medium">{demandPercent}</span>
  </div>

  {/* Progress bar */}
  <div className="w-full bg-gray-800 h-1 mb-4">
    <div
      className="bg-teal-500 h-1"
      style={{ width: `${Tryon}%` }}
    ></div>
  </div>

  {/* Buttons row */}
  <div className="flex  items-center justify-between">
    {/* Add to Bag */}
    <button className="flex items-center w-3/4 gap-2 bg-[#3C8E9A] text-white px-6 py-2  ">
    {/* dummy */}
     <div></div>
     <div></div>
     <div></div>

      <img src={Bag} className="h-3" alt="bag" />
      <span className="text-sm tracking-wide ">ADD TO BAG</span>
    </button>

    {/* Heart */}
    <button className="flex items-center justify-center border border-gray-500 px-3 py-2 rounded-sm">
      <img src={heart} className="h-4 w-4" alt="wishlist" />
    </button>
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
      currentPrice: "₹325.000",
      originalPrice: "₹425.000",
      savePercent: "SAVE 24%",
      Tryon : 80,
      demandPercent: "+38%",
    },
    {
      image:
        saree,
      rating: 4,
      reviews: 9,
      fitted: 1967,
      name: "RED DESIGNER LEHENGA",
      currentPrice: "₹325.000",
      originalPrice: "₹425.000",
      savePercent: "SAVE 24%",
      Tryon: 80,
      demandPercent: "+38%",
    },
    {
      image:
        saree,
      rating: 4,
      reviews: 9,
      fitted: 1967,
      name: "RED DESIGNER LEHENGA",
      currentPrice: "₹325.000",
      originalPrice: "₹425.000",
      savePercent: "SAVE 24%",
      Tryon: 80,
      demandPercent: "+38%",
    },
    {
      image:
        saree,
      rating: 4,
      reviews: 9,
      fitted: 1967,
      name: "RED DESIGNER LEHENGA",
      currentPrice: "₹325.000",
      originalPrice: "₹425.000",
      savePercent: "SAVE 24%",
      Tryon: 80,
      demandPercent: "+38%",
    },
    {
      image:
        saree,
      rating: 4,
      reviews: 9,
      fitted: 1967,
      name: "RED DESIGNER LEHENGA",
      currentPrice: "₹325.000",
      originalPrice: "₹425.000",
      savePercent: "SAVE 24%",
      Tryon: 80,
      demandPercent: "+38%",
    },
  ];

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "Outfit" }}
    >
      
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="  mb-6">
        <button className="p-2 border  border-gray-700 text-gray-400 bg-[#0A0E14] tracking-wider text-sm md:text-base">
          TRENDING 
        </button>
       </div>
        {/* Header Section */}
        <div className="text-start mb-8 md:mb-12">
          <h1 className="text-4xl text-start md:text-6xl lg:text-5xl font-bold mb-6 leading-tight">
            Trending in
            {/* <br /> */}
            Virtual Try-On
          </h1>
          <p className="text-gray-400 text-start text-sm md:text-base max-w-2xl leading-relaxed">
            This week, the outfits that have been tried-on the most by our users
            are truly remarkable! From stylish dresses to trendy casual wear,
            everyone seems to be exploring new looks.
          </p>
        </div>

    

        {/* Products Horizontal Scroll */}
        <div className="mb-8 md:mb-12">
          <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
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

        {/* Footer Section */}
        <div className="text-center space-y-6">
          {/* <div className="text-gray-400 text-sm font-mono">
            LIVE MARKET DATA UPDATED: 17:36:54
          </div> */}
          <button className="bg-[#3C8E9A] hover:bg-teal-600 text-white font-medium px-8 py-4  transition-colors duration-200 flex items-center gap-2 mx-auto">
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