import React from 'react';
import { ArrowRight, Users, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FashionTryOnSection = () => {
  const navigate = useNavigate('')
  return (
    <div className="min-h-screen">
      {/* Main Hero Section */}
      <div className="container mx-auto px-6 py-16">

        {/* Top Row: Badge Left + Excellence Right */}
        
          <div className=' '>
            <div className="flex justify-evenly items-center">
            {/* Headings Left-Aligned */}
            <div>
  
           <div className='flex items-center gap-16 md:gap-36 lg:gap-64'>       
            <div className="mt-8 space-y-2  text-left">
              <h1 className="text-3xl sm:text-sm lg:text-5xl font-bold text-gray-900 leading-tight">
                EXPERIENCE FASHION<br />
                LIKE NEVER BEFORE
              </h1>
              <h2 className="text-3xl lg:text-6xl font-bold text-gray-900">
                TRY ON
              </h2>
            </div>


            <div className='boarder-t'>
              {/* Technology Badge */}
              <div className=" items-center">
                <span className="text-sm font-medium text-gray-600 tracking-wide">
                  TECHNOLOGY REDEFINED
                </span>
              </div>

              {/* Excellence Badge */}
              <div className=" text-black inline-block">
                <span className="text-3xl font-bold tracking-wide">EXCELLENCE</span>
              </div>
            </div>
            </div>  
            <div className="mt-12 space-y-4   max-w-md">
              {/* Subtitle */}
              <p className="text-lg text-gray-800 text-400">
                Step into the future of shopping – try outfits on your 3D avatar before you buy.
              </p>

              {/* Buttons stacked vertically */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-landingpage-bg-blue hover:bg-teal-600 text-white px-8 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200 group">
                  Try It Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={()=>navigate('/products')} className="border-1 border-gray-300 text-gray-900 hover:bg-gray-900 hover:text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 group">
                  EXPLORE COLLECTIONS
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
  </div>
  </div>
            {/* Subtitle and CTA Buttons in Column */}
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