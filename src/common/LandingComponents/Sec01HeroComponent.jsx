import React from 'react';
import img01 from '../../assets/B2Bassets/HomePageAssets/heroImage01.png';
import img02 from '../../assets/B2Bassets/HomePageAssets/heroImage02.png'
import img03 from '../../assets/B2Bassets/HomePageAssets/heroImage03.png'
import longStar from '../../assets/B2Bassets/HomePageAssets/long_star.png'
import { useNavigate } from 'react-router-dom';

const HeroComponent = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#D3DDE5] relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-5 left-129 sm:left-12 md:left-18 lg:left-38 xl:left-122">
        <img src={longStar} alt="Star" />
      </div>
      
      <div className="absolute bottom-20 right-15  sm:right-8 md:right-12 lg:right-15">
         <img src={longStar} alt="Star" />
      </div>

      <div className="container mx-auto px-4 py-16 flex items-center justify-between min-h-screen sm:px-6 lg:px-8 sm:py-12 lg:py-16  flex-col lg:flex-row ">
        {/* Left Content */}
        <div className="flex-1 max-w-md lg:max-w-md text-center lg:text-left mb-8 lg:mb-0"  style={{ fontFamily: "'Solitreo', cursive" }} >
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight sm:text-4xl lg:text-5xl xl:text-6xl   sm:mb-6 ">
             Experience the<br /> Next Era of <br />
            Shopping
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed sm:text-lg lg:text-xl sm:mb-8 px-4 lg:px-0">
             Build a digital twin of yourself in <br />
            seconds and try on outfits just like you <br />
            would in-store. But smarter, faster, and <br />
            from anywhere
          </p>
          
          <button 
          onClick={()=> navigate("/products")}
          className="bg-primary-blue text-white px-12 pt-4 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ">
            Shop Collection
          </button>
        </div>

        {/* Right Content - Saree Models */}
        <div className="flex-1 flex justify-center items-center w-full">
          <div className="flex space-x-6 sm:space-x-4 lg:space-x-6 justify-center">
            {/* Model 1 - Gold Saree */}
            <div className="relative group w-42 h-94 transform transition-all duration-500 hover:scale-105 ">
              <img src={img01} alt="sareeImage 01" className='' />
            </div>

            {/* Model 2 - Pink Saree */}
            <div className="relative group w-42 h-94 transform transition-all duration-500 hover:scale-105">
              <img src={img02} alt="sareeImage 01" className='' />
            </div>


            {/* Model 3 - Dark Green Saree */}
            <div className="relative group w-42 h-94 transform transition-all duration-500 hover:scale-105">
              <img src={img03} alt="sareeImage 01" className='' />
            </div>


          </div>
        </div>
      </div>

      {/* Floating elements for added elegance */}
      <div className="absolute top-1/3 right-10 w-4 h-4 bg-blue-300 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute bottom-1/3 left-10 w-3 h-3 bg-purple-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-pink-300 rounded-full opacity-40 animate-ping"></div>
    </div>

  );
};

export default HeroComponent;