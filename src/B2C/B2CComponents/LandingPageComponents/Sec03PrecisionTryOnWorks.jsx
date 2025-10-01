import React, { useState } from 'react';
import { ShoppingBag, Heart, Import } from 'lucide-react';

import FashionSelector from './FashionSelectors'

const PrecisionTryOnSection = () => {
  return (
    <div className="bg-gray-100 py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 border border-gray-300 bg-white px-5 py-2">
            <span className="text-xs font-semibold text-gray-600 tracking-widest uppercase">
              INTERACTIVE EXPERIENCE
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight px-4">
            SEE HOW TRY ON WORKS
          </h2>
          
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4">
            India's first ever <span className="font-bold">TRY ON</span>. See how premium fabrics drape, move, and behave with absolute precision
          </p>
        </div>

        {/* Fashion Selector Component */}
        <FashionSelector />

        {/* Demo CTA */}
          {/* <div className="text-center mt-12 lg:mt-16">
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 sm:px-12 py-4 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95">
              Start Your Virtual Try-On Experience
            </button>
            <p className="text-xs sm:text-sm text-gray-500 mt-4">
              No account required • Free to try • Works on any device
            </p>
          </div> */}
      </div>
    </div>
  );
};

export default PrecisionTryOnSection;