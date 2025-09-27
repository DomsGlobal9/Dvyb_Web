import React from 'react';
import Silk_saree from '../../../assets/B2cAssets/LandingPageImges/Silk_saree.png'

import Cotton from '../../../assets/B2cAssets/LandingPageImges/Cotton.png'
import Velvet from '../../../assets/B2cAssets/LandingPageImges/Velvet.png'
import Linen from '../../../assets/B2cAssets/LandingPageImges/Linen.png'


const FashionSelector = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-white p-4 md:p-8 space-y-8 md:space-y-0 md:space-x-8">
      {/* Left Section: Main Image */}
      <div className="relative w-full md:w-xl">
        <img
          src={Silk_saree} // Replace with actual image URL
          alt="Silk Saree"
          className="w-full h-auto rounded-lg object-cover"
          style={{ background: '#A0522D' }} // Brown background as in the image
        />
        <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded text-black text-sm font-bold">
          SILK SAREE<br />
          Premium Silk
        </div>
      </div>

      {/* Right Section: Controls */}
     <div className="w-full md:w-1/2 max-w-md flex flex-col space-y-6">
  {/* Select Garment */}
  <h3 className="text-center md:text-left text-gray-600 text-sm font-semibold uppercase">Select Garment</h3>
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-white border border-gray-200 rounded p-2 text-center">
      <div className="w-full h-36 mb-2 overflow-hidden rounded">
        <img
          src={Silk_saree}
          alt="Silk saree"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm text-start pt-3 pl-1 text-gray-800">Silk saree</p>
    </div>
    <div className="bg-white border border-gray-200 rounded p-2 text-center">
      <div className="w-full h-36 mb-2 overflow-hidden rounded">
        <img
          src={Cotton}
          alt="Cotton saree"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm text-start pt-3 pl-1 text-gray-800">Cotton saree</p>
    </div>
    <div className="bg-white border border-gray-200 rounded p-2 text-center">
      <div className="w-full h-36 mb-2 overflow-hidden rounded">
        <img
          src={Velvet}
          alt="Velvet Lehenga"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm text-start pt-3 pl-1 text-gray-800">Velvet Lehenga</p>
    </div>
    <div className="bg-white border border-gray-200 rounded p-2 text-center">
      <div className="w-full h-36 mb-2 overflow-hidden rounded">
        <img
          src={Linen}
          alt="Linen Dress"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm text-start pt-3 pl-1 text-gray-800">Linen Dress</p>
    </div>
  </div>
  
  {/* Material Palette */}
  <h3 className="text-center md:text-left text-gray-600 text-sm font-semibold uppercase">Material Palette</h3>
  <div className='border-t -mt-2 border-gray-300'></div>
  <div className="flex space-x-2  justify-center md:justify-start">
    <div className="w-8 h-8 bg-black border border-gray-300"></div>
    <div className="w-8 h-8 bg-gray-800 border border-gray-300"></div>
    <div className="w-8 h-8 bg-gray-600 border border-gray-300"></div>
    <div className="w-8 h-8 bg-gray-400 border border-gray-300"></div>
    <div className="w-8 h-8 bg-gray-200 border border-gray-300"></div>
  </div>
  
  {/* Precision Analysis */}
  <h3 className="text-center md:text-left text-gray-600 text-sm font-semibold uppercase">Precision Analysis</h3>
  <div className="bg-gray-50 p-4 rounded border border-blue-100">
    <div className="flex justify-between items-center mb-2">
      <p className="text-black font-semibold">Perfect Fit Detected</p>
      <p className="text-[#5B9BA5] text-sm">98.2% Accuracy</p>
    </div>
    <p className="text-gray-600 text-sm">
      Based on your precise measurements this garment will provide exceptional fit with natural draping and optimal comfort
    </p>
  </div>
  
  {/* Buttons */}
  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center md:justify-start">
    <button className="bg-[#5B9BA5] text-white px-6 py-3 rounded font-semibold uppercase">Add to Collection</button>
    <button className="bg-white text-black px-6 py-3 rounded border border-gray-300 font-semibold uppercase">Save Design</button>
  </div>
</div>
    </div>
  );
};

export default FashionSelector;

// 