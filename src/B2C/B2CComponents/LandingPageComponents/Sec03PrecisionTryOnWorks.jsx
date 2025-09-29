import React from 'react';
import { Users, Target, Award } from 'lucide-react';
import FashionSelector from './FashionSelectors';

const PrecisionTryOnSection = () => {
  return (
    <div className="bg-white pt-8 lg:pt-12">
      <div className="container mx-auto px-6 mt-4 lg:mt-0 ">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex border  items-center gap-2 bg-white px-4 p-2  ">
            <span className="text-sm font-medium text-gray-600 tracking-wide">
              INTERACTIVE EXPERIENCE
            </span>
          </div>
          <h2 className="text-4xl py-3 lg:text-5xl font-bold text-gray-900">
            See How Precision Try-On Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of fashion with our revolutionary 3D try-on technology. See how garments 
            look and fit with absolute precision and shop with complete confidence.
          </p>
        </div>




<FashionSelector/>













        {/* Demo CTA */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95">
            Start Your Virtual Try-On Experience
          </button>
          <p className="text-sm text-gray-500 mt-3">No account required • Free to try • Works on any device</p>
        </div>
      </div>
    </div>
  );
};

export default PrecisionTryOnSection;










        // {/* Process Steps */}
        // <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        //   {/* Step 1 */}
        //   <div className="text-center space-y-6 group">
        //     <div className="relative">
        //       {/* Image placeholder - replace with your actual image */}
        //       <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-gray-100 flex items-center justify-center">
        //         <img 
        //           src="/api/placeholder/128/128" 
        //           alt="Create Avatar Step"
        //           className="w-full h-full object-cover"
        //         />
        //         {/* Fallback icon if no image */}
        //         <Users className="w-12 h-12 text-gray-400 absolute" />
        //       </div>
        //       <div className="absolute -top-2 -right-6 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
        //         <span className="text-white font-bold text-sm">1</span>
        //       </div>
        //     </div>
        //     <div className="space-y-2">
        //       <h3 className="text-xl font-bold text-gray-900">Create Your Avatar</h3>
        //       <p className="text-gray-600">Upload your photo and create a personalized 3D avatar that matches your exact body measurements</p>
        //     </div>
        //   </div>

        //   {/* Step 2 */}
        //   <div className="text-center space-y-6 group">
        //     <div className="relative">
        //       {/* Image placeholder - replace with your actual image */}
        //       <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-gray-100 flex items-center justify-center">
        //         <img 
        //           src="/api/placeholder/128/128" 
        //           alt="Select and Try On Step"
        //           className="w-full h-full object-cover"
        //         />
        //         {/* Fallback icon if no image */}
        //         <Target className="w-12 h-12 text-gray-400 absolute" />
        //       </div>
        //       <div className="absolute -top-2 -right-6 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center shadow-md">
        //         <span className="text-white font-bold text-sm">2</span>
        //       </div>
        //     </div>
        //     <div className="space-y-2">
        //       <h3 className="text-xl font-bold text-gray-900">Select & Try On</h3>
        //       <p className="text-gray-600">Choose from thousands of premium outfits and see them instantly rendered on your personalized avatar</p>
        //     </div>
        //   </div>

        //   {/* Step 3 */}
        //   <div className="text-center space-y-6 group">
        //     <div className="relative">
        //       {/* Image placeholder - replace with your actual image */}
        //       <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-gray-100 flex items-center justify-center">
        //         <img 
        //           src="/api/placeholder/128/128" 
        //           alt="Perfect Fit Step"
        //           className="w-full h-full object-cover"
        //         />
        //         {/* Fallback icon if no image */}
        //         <Award className="w-12 h-12 text-gray-400 absolute" />
        //       </div>
        //       <div className="absolute -top-2 -right-6 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
        //         <span className="text-white font-bold text-sm">3</span>
        //       </div>
        //     </div>
        //     <div className="space-y-2">
        //       <h3 className="text-xl font-bold text-gray-900">Perfect Fit</h3>
        //       <p className="text-gray-600">Get accurate fit predictions with 98.2% precision and make confident purchase decisions</p>
        //     </div>
        //   </div>
        // </div>

        // {/* Feature Highlights */}
        // <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 mb-12">
        //   <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
        //     <div className="text-2xl font-bold text-teal-600">98.2%</div>
        //     <div className="text-sm text-gray-600">Fit Accuracy</div>
        //   </div>
        //   <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
        //     <div className="text-2xl font-bold text-orange-600">10K+</div>
        //     <div className="text-sm text-gray-600">Outfits Available</div>
        //   </div>
        //   <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
        //     <div className="text-2xl font-bold text-purple-600">3D</div>
        //     <div className="text-sm text-gray-600">Realistic Rendering</div>
        //   </div>
        //   <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
        //     <div className="text-2xl font-bold text-teal-600">Instant</div>
        //     <div className="text-sm text-gray-600">Try-On Speed</div>
        //   </div>
        // </div>
