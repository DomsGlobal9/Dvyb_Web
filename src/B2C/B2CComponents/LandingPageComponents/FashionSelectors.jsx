import React, { useState } from 'react';
import Silk_saree from '../../../assets/B2cAssets/LandingPageImges/Silk_saree.png';
import Cotton from '../../../assets/B2cAssets/LandingPageImges/Cotton.png';
import Velvet from '../../../assets/B2cAssets/LandingPageImges/Velvet.png';
import Linen from '../../../assets/B2cAssets/LandingPageImges/Linen.png';
import heart from '../../../assets/B2cAssets/LandingPageImges/majesticons_heart-line.png';
import Bag from '../../../assets/B2cAssets/LandingPageImges/Bag.png';
const FashionSelector = () => {
  const [selectedGarment, setSelectedGarment] = useState(null); // Initialize as null for default image
  const [selectedColor, setSelectedColor] = useState(0);

  const garments = [
    { name: 'Silk saree', image: 'https://res.cloudinary.com/doiezptnn/image/upload/v1759313869/Rectangle_10_uhaazu.png' },
    { name: 'Cotton saree', image: Cotton },
    { name: 'Velvet Lehenga', image: Velvet },
    { name: 'Velvet Lehenga', image: Linen }
  ];

  const colors = [
    { name: 'Red', code: '#E63946' },
    { name: 'Green', code: '#06D6A0' },
    { name: 'Purple', code: '#6366F1' }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center bg-transparent py-8 px-4 md:px-8 gap-6 lg:gap-12">
      {/* Left Section: Main Hero Image */}
      <div className="relative w-full lg:w-[480px] xl:w-[520px]">
        <div className="relative rounded-lg overflow-hidden ">
          <img
            src= 'https://res.cloudinary.com/doiezptnn/image/upload/v1759312994/Frame_1_lrgztv.png'
            alt= 'Default'
            className="w-full h-auto object-cover"
          />
          {/* Label Overlay */}
          <div className="absolute bottom-6 left-6 bg-white px-5 py-3 shadow-lg">
            <p className="text-black text-sm font-bold leading-tight">{selectedGarment !== null ? garments[selectedGarment].name.toUpperCase() : 'DEFAULT'}</p>
            <p className="text-gray-600 text-xs">Premium</p>
          </div>
        </div>
      </div>

      {/* Right Section: Controls */}
      <div className="w-full lg:w-[440px] xl:w-[480px] flex flex-col space-y-8">
        {/* Select Any Garment */}
        <div>
          <h3 className="text-gray-900 text-sm font-bold uppercase mb-4 tracking-wide">
            SELECT ANY GARMENT
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {garments.map((garment, index) => (
              <div
                key={index}
                onClick={() => setSelectedGarment(index)}
                className={`bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                  selectedGarment === index 
                    ? 'ring-2 ring-teal-500 shadow-lg scale-105' 
                    : 'ring-1 ring-gray-200 hover:ring-gray-300 hover:shadow-md'
                }`}
              >
                <div className="w-full h-auto p-1  overflow-hidden">
                  <img
                    src={garment.image}
                    alt={garment.name}
                    className="w-full h-full   object-contain"
                  />
                  <p className="text-sm pl-4 p-0.5 font-medium text-gray-800">{garment.name}</p>
                </div>
                {/* <div className="pl-4 p-1">
                  
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {/* Select Colours */}
        <div>
          <h3 className="text-gray-900 text-sm font-bold uppercase mb-4 tracking-wide">
            SELECT COLOURS
          </h3>
          <div className="flex gap-3">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(index)}
                className={`w-12 h-12 rounded transition-all duration-200 ${
                  selectedColor === index 
                    ? 'ring-2 ring-offset-2 ring-gray-800 scale-110' 
                    : 'ring-1 ring-gray-300 hover:ring-gray-400'
                }`}
                style={{ backgroundColor: color.code }}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center  sm:flex-row gap-3 pt-2">
          <button className="flex-1  bg-[#5B9BA5] hover:bg-[#4A8A94] text-white px-6 py-3.5 rounded font-semibold text-sm uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
          <img src={Bag} alt="" className='h-4' />  ADD TO BAG
          </button>
          <button className=" text-gray-700 px-5 flex  justify-center py-3.5 rounded border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md">
            {/* <Heart size={20} /> */}
            <img src={heart} alt=""  />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FashionSelector;