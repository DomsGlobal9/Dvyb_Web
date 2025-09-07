import React, { useState } from "react";
import { FaHeart, FaShoppingBag, FaUser, FaSearch } from "react-icons/fa";
import logo from "../../../assets/Navbar/DVYB_Enterprise_Logo.png";
import EtImg from "../../../assets/Navbar/ET-WEAR.png"
import fav from '../../../assets/B2Bassets/NavbarImages/heart.png'
import cart from '../../../assets/B2Bassets/NavbarImages/cart.png'
import profile from '../../../assets/B2Bassets/NavbarImages/profile.png'
const Navbar = () => {
  const [showWomenCategories, setShowWomenCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // Women Categories + Sub Collections
  const womenCategories = {
    "ETHNIC WEAR": [
      { name: "SAREE", img: EtImg },
      { name: "SALWAR SUITS", img: EtImg },
      { name: "LEHENGAS", img: EtImg },
      { name: "ANARKALI", img: EtImg },
      { name: "DUPATTAS", img: EtImg},
      { name: "ETHNIC JACKET", img: EtImg },
    ],
    "TOP WEAR": [
      { name: "T-SHIRTS", img: EtImg },
      { name: "SHIRTS", img: EtImg },
      { name: "BLOUSES", img: EtImg },
    ],
    "BOTTOM WEAR": [
      { name: "JEANS", img: EtImg },
      { name: "TROUSERS", img: EtImg},
      { name: "SKIRTS", img: EtImg },
    ],
    "DRESSES & JUMPSUITS": [
      { name: "MAXI DRESSES", img: EtImg},
      { name: "JUMPSUITS", img: EtImg },
    ],
    "LOUNGE & SLEEPWEAR": [
      { name: "NIGHT SUITS", img: EtImg },
      { name: "PAJAMAS", img: EtImg },
    ],
    "ACTIVE WEAR": [
      { name: "SPORTS BRAS", img: EtImg },
      { name: "LEGGINGS", img: EtImg },
    ],
    "WINTER WEAR": [
      { name: "SWEATERS", img: EtImg },
      { name: "JACKETS", img: EtImg },
    ],
  };

  return (
    <header className="border-b relative">
      {/* Top Row */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="w-1/3"></div>

        {/* Logo Center */}
        <div className="flex justify-center w-1/3">
          <img src={logo} alt="logo" className="h-12 object-contain" />
        </div>

        {/* Right Icons */}
        <div className="w-1/3 flex justify-end space-x-6 text-xl text-blue-900">
          {/* <FaHeart className="cursor-pointer hover:opacity-70" />
          <FaShoppingBag className="cursor-pointer hover:opacity-70" />
          <FaUser className="cursor-pointer hover:opacity-70" /> */}
          <img className="cursor-pointer size-5" src={fav}  alt="" />
          <img className="cursor-pointer size-5" src={cart} alt="" />
          <img className="cursor-pointer size-5" src={profile}  alt="" />

        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="flex justify-center items-center space-x-8 py-2 text-sm font-medium text-gray-700 relative">
        {/* WOMEN Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowWomenCategories(true)}
          onMouseLeave={() => {
            setShowWomenCategories(false);
            setActiveCategory(null);
          }}
        >
          <a href="#" className="text-blue-900 font-semibold">
            WOMEN
          </a>

          {/* Women Categories Mega Menu */}
          {showWomenCategories && (
            <div className="fixed left-0 right-0 top-[110px] bg-gray-100 border-t shadow-md z-50">
              {/* First Row: Categories */}
              <div className="flex justify-center space-x-8 py-3 text-sm font-medium text-gray-700 border-b">
                {Object.keys(womenCategories).map((cat, index) => (
                  <button
                    key={index}
                    onMouseEnter={() => setActiveCategory(cat)}
                    className={`transition ${
                      activeCategory === cat ? "text-blue-900 border-b-2 border-blue-900" : "hover:text-blue-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Second Row: Sub Collections */}
              {activeCategory && (
                <div className="flex justify-center gap-8 py-6 flex-wrap bg-white">
                  {womenCategories[activeCategory].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center w-32">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-32 w-24 object-cover rounded shadow-sm hover:scale-105 transition"
                      />
                      <span className="mt-2 text-xs font-medium text-gray-700">{item.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Other Nav Links */}
        <a href="#" className="text-gray-500">
          MEN <span className="text-xs">(coming soon)</span>
        </a>
        <a href="#" className="text-gray-500">
          KIDS <span className="text-xs">(coming soon)</span>
        </a>
        <a href="#" className="text-gray-700">
          2D TRY ON
        </a>

        {/* Search Icon */}
        <FaSearch className="ml-6 cursor-pointer text-gray-600 hover:text-blue-900" />
      </nav>
    </header>
  );
};

export default Navbar;
