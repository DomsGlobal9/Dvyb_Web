import React from 'react';
import { ArrowRight, Users, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FashionTryOnSection = () => {
  const navigate = useNavigate('')
  return (
    <div className="min-h-screen">
      {/* Main Hero Section */}
      <div className="container mx-auto px-6 py-8">

        {/* Top Row: Badge Left + Excellence Right */}
        <div className='w-full'>
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ">
    
    {/* Left Section - Main Content */}
    <div className="w-full lg:w-auto">
      
      {/* Top Row - Heading and Badges */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 md:gap-20 lg:gap-32 xl:gap-48'>       
        
        {/* Main Heading */}
        <div className="mt-4 sm:mt-6 lg:mt-8 space-y-2 text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            EXPERIENCE FASHION<br />
            LIKE NEVER BEFORE
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
            TRY ON
          </h2>
        </div>

        {/* Badges Section */}
        <div className='border-t sm:border-t-0 pt-4 sm:pt-0'>
          {/* Technology Badge */}
          <div className="mb-2">
            <span className="text-xs sm:text-sm md:text-base font-medium text-gray-600 tracking-wide">
              TECHNOLOGY REDEFINED
            </span>
          </div>

          {/* Excellence Badge */}
          <div className="text-black inline-block">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide">
              EXCELLENCE
            </span>
          </div>
        </div>
      </div>  

      {/* Bottom Section - Description and CTAs */}
      <div className="mt-8 sm:mt-10 lg:mt-12 space-y-4 max-w-full sm:max-w-lg lg:max-w-md xl:max-w-lg">
        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
          Step into the future of shopping – try outfits on your 3D avatar before you buy.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="bg-landingpage-bg-blue hover:bg-teal-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200 group text-sm sm:text-base">
            Try It Now
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => navigate('/products')} 
            className="border border-gray-300 text-gray-900 hover:bg-gray-900 hover:text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 group text-sm sm:text-base whitespace-nowrap"
          >
            EXPLORE COLLECTIONS
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
    
  </div>
</div>

      









        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {/* Stat 1 */}
          <div className="text-center space-y-2">
            <div className="text-5xl lg:text-6xl font-bold text-gray-900">
              247,893<span className="text-landingpage-bg-blue">+</span>
            </div>
            <p className="text-gray-600 font-medium leading-none">Happy Virtual Shoppers</p>
            <p className="text-gray-600 font-thin leading-none" >COMPLETED</p>
          </div>

          {/* Stat 2 */}
          <div className="text-center space-y-2">
            <div className="text-5xl lg:text-6xl font-bold text-gray-900">
              99.97<span className="text-landingpage-bg-blue">%</span>
            </div>
            <p className="text-gray-600 font-medium leading-none">Accuracy Rate</p>
            <p className="text-gray-600 font-thin leading-none" >VERIFIED</p>
          </div>

          {/* Stat 3 */}
          <div className="text-center space-y-2">
            <div className="text-5xl lg:text-6xl font-bold text-gray-900">
              150<span className="text-landingpage-bg-blue">+</span>
            </div>
            <p className="text-gray-600 font-thin leading-none" >EXPLORE PLATFORM</p>
            <p className="text-gray-600 font-medium leading-none">Luxury Partners</p>
            <p className="text-gray-600 font-thin leading-none" >GLOBAL</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FashionTryOnSection;