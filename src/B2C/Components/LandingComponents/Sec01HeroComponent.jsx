import React from 'react';
import img01 from '../../../assets/B2Cassets/HomePageAssets/heroImage01.png';
import img02 from '../../../assets/B2Cassets/HomePageAssets/heroImage02.png'
import img03 from '../../../assets/B2Cassets/HomePageAssets/heroImage03.png'
import longStar from '../../../assets/B2Cassets/HomePageAssets/long_star.png'

const HeroComponent = () => {
  return (
    <div className="min-h-screen bg-[#D3DDE5] relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-5 left-122 ">
        {/* <svg className="w-8 h-8 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
        </svg> */}
        <img src={longStar} alt="Star" />
      </div>
      
      <div className="absolute bottom-20 right-15 ">
         <img src={longStar} alt="Star" />
      </div>

      <div className="container mx-auto px-4 py-16 flex items-center justify-between min-h-screen">
        {/* Left Content */}
        <div className="flex-1 max-w-md"  style={{ fontFamily: "'Solitreo', cursive" }} >
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Shop More &<br />
            Save More
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Shopping Built, Made Easy With Huge<br />
            Discount Like Never Before
          </p>
          
          <button className="bg-[#1C4C74] text-white px-12 py-2 rounded-full pt-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Shop Collection
          </button>
        </div>

        {/* Right Content - Saree Models */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex space-x-6">
            {/* Model 1 - Gold Saree */}
            <div className="relative group w-42 h-94 transform transition-all duration-500 hover:scale-105">
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