import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FashionTryOnSection = () => {
    const [showModall, setShowModall] = useState(false);
  const navigate = useNavigate();

   const handleTryOnClick = () => {
    setShowModall(true);
  };

   const handleYes = () => {
    setShowModall(false);
    navigate("/products");
  };

  const handleNo = () => {
    setShowModall(false);
    navigate("/");
  };

  return (
    <>
    <div className="text-white p-4 mt-80 md:mt-0 lg:mt-56 font-redhat  sm:p-6 md:p-8 lg:p-0">
      {/* Main Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start w-full">
          {/* Left Section - Image Placeholder (Handled by VideoSection background) */}
          {/* Content Section */}
          <div className="lg:ml-8 text-left w-full lg:w-auto">
            {/* Top Row - Heading */}
            <div className="space-y-2" >
              <h1  className="text-2xl sm:text-4xl md:text-5xl  font-redhat lg:text-4xl font-semi-bold leading-tight">
                Experience Fashion Like<br className='hidden lg:block' /> Never Before
              </h1>
              <h2 className="text-5xl mt-3 sm:text-4xl md:text-5xl lg:text-7xl font-bold">
                TRY ON
              </h2>
            </div>

            {/* Bottom Section - Description and CTAs */}
            <div className="mt-5 sm:mt-8 lg:mt-7 space-y-4 max-w-full sm:max-w-lg lg:max-w-md xl:max-w-lg">
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed" style={{fontFamily:"Outfit"}}>
                Step into the future of shopping – Try outfits on your Try On avatar before you buy.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4" style={{fontFamily:"Outfit"}}>
                <button
                  onClick={handleTryOnClick}
                  className="bg-[#5B9BA5] cursor-pointer hover:bg-teal-600 text-white px-6 py-3  font-semibold flex items-center justify-center gap-2 transition-colors duration-200 text-sm sm:text-base"
                >
                  Try It Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button> 
                  <button
                    onClick={() => navigate('/products')}
                    className="bg-white text-black  cursor-pointer hover:bg-black hover:text-white px-6 py-3  font-semibold flex items-center justify-center gap-2 transition-all duration-200 text-sm sm:text-base"
                  >
                  Explore Collections <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

         {showModall && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <p className="text-gray-800 mb-4 text-center">
                  For try-on you need to select a product. <br />
                  Would you like to try?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleYes}
                    className="px-4 py-2 bg-[#5B9BA5] cursor-pointer text-white rounded-lg hover:bg-blue-950"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleNo}
                    className="px-4 py-2 bg-gray-300 cursor-pointer text-gray-800 rounded-lg hover:bg-gray-400"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          </>
  );
};

export default FashionTryOnSection;


// import React from 'react';
// import { ArrowRight, Users, Target, Award } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const FashionTryOnSection = () => {
//   const navigate = useNavigate('')
//   return (
//     <div className="min-h-screen lg:min-h-0 ">
//       {/* Main Hero Section */}
//       <div className="container mx-auto px-6 py-8">

//         {/* Top Row: Badge Left + Excellence Right */}
//         <div className='w-full'>
//   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ">
    
//     {/* Left Section - Main Content */}
//     <div className="w-full lg:w-auto">
      
//       {/* Top Row - Heading and Badges */}
//       <div className='flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 md:gap-20 lg:gap-32 xl:gap-48'>       
        
//         {/* Main Heading */}
//         <div className="mt-4 sm:mt-6 lg:mt-8 space-y-2 text-left">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
//             EXPERIENCE FASHION<br />
//             LIKE NEVER BEFORE
//           </h1>
//           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
//             TRY ON
//           </h2>
//         </div>

//         {/* Badges Section */}
//         {/* <div className='border-t sm:border-t-0 pt-4 sm:pt-0'> */}
//           {/* Technology Badge */}
//           {/* <div className="mb-2">
//             <span className="text-xs sm:text-sm md:text-base font-medium text-gray-600 tracking-wide">
//               TECHNOLOGY REDEFINED
//             </span>
//           </div> */}

//           {/* Excellence Badge */}
//           {/* <div className="text-black inline-block">
//             <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide">
//               EXCELLENCE
//             </span>
//           </div> */}
//         {/* </div> */}
//       </div>  

//       {/* Bottom Section - Description and CTAs */}
//       <div className="mt-8 sm:mt-10 lg:mt-12 space-y-4 max-w-full sm:max-w-lg lg:max-w-md xl:max-w-lg">
//         {/* Subtitle */}
//         <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
//           Step into the future of shopping – try outfits on your 3D avatar before you buy.
//         </p>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//           <button className="bg-landingpage-bg-blue hover:bg-teal-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200 group text-sm sm:text-base">
//             Try It Now
//             <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//           </button>
//           <button 
//             onClick={() => navigate('/products')} 
//             className="border border-gray-300 text-gray-900 hover:bg-gray-900 hover:text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 group text-sm sm:text-base whitespace-nowrap"
//           >
//             EXPLORE COLLECTIONS
//             <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>
//       </div>
//     </div>
    
//   </div>
// </div>

      









//         {/* Stats Section */}
//         {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-9 lg:mt-16">
          
//           <div className="text-center space-y-2">
//             <div className="text-5xl lg:text-6xl font-bold text-gray-900">
//               247,893<span className="text-landingpage-bg-blue">+</span>
//             </div>
//             <p className="text-gray-600 font-medium leading-none">Happy Virtual Shoppers</p>
//             <p className="text-gray-600 font-thin leading-none" >COMPLETED</p>
//           </div>

        
//           <div className="text-center space-y-2">
//             <div className="text-5xl lg:text-6xl font-bold text-gray-900">
//               99.97<span className="text-landingpage-bg-blue">%</span>
//             </div>
//             <p className="text-gray-600 font-medium leading-none">Accuracy Rate</p>
//             <p className="text-gray-600 font-thin leading-none" >VERIFIED</p>
//           </div>

      
//           <div className="text-center space-y-2">
//             <div className="text-5xl lg:text-6xl font-bold text-gray-900">
//               150<span className="text-landingpage-bg-blue">+</span>
//             </div>
//             <p className="text-gray-600 font-thin leading-none" >EXPLORE PLATFORM</p>
//             <p className="text-gray-600 font-medium leading-none">Luxury Partners</p>
//             <p className="text-gray-600 font-thin leading-none" >GLOBAL</p>
//           </div>
//         </div> */}
//       </div>

//     </div>
//   );
// };

// export default FashionTryOnSection;