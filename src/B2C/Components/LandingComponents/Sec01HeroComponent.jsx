import React from 'react';

const HeroComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-16 left-80 text-blue-600 opacity-80">
        <svg className="w-8 h-8 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-20 right-20 text-blue-500 opacity-60">
        <svg className="w-10 h-10 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 flex items-center justify-between min-h-screen">
        {/* Left Content */}
        <div className="flex-1 max-w-md">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Shop More &<br />
            Save More
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Shopping Built, Made Easy With Huge<br />
            Discount Like Never Before
          </p>
          
          <button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Shop Collection
          </button>
        </div>

        {/* Right Content - Saree Models */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex space-x-6">
            {/* Model 1 - Gold Saree */}
            <div className="relative group">
              <div className="w-48 h-80 bg-gradient-to-b from-amber-100 to-amber-200 rounded-full overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-2">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-600 to-amber-800 opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-64 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-full opacity-90 shadow-inner"></div>
                </div>
                {/* Simulated model silhouette */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-48 bg-gradient-to-t from-amber-900 to-amber-700 rounded-t-full opacity-70"></div>
              </div>
            </div>

            {/* Model 2 - Pink Saree */}
            <div className="relative group">
              <div className="w-48 h-80 bg-gradient-to-b from-rose-100 to-rose-200 rounded-full overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1">
                <div className="absolute inset-0 bg-gradient-to-b from-rose-500 to-rose-700 opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-64 bg-gradient-to-b from-pink-400 to-rose-600 rounded-full opacity-90 shadow-inner"></div>
                </div>
                {/* Simulated model silhouette */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-48 bg-gradient-to-t from-rose-900 to-rose-700 rounded-t-full opacity-70"></div>
              </div>
            </div>

            {/* Model 3 - Dark Green Saree */}
            <div className="relative group">
              <div className="w-48 h-80 bg-gradient-to-b from-emerald-100 to-emerald-200 rounded-full overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-2">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-600 to-emerald-900 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-64 bg-gradient-to-b from-emerald-500 to-emerald-800 rounded-full opacity-90 shadow-inner"></div>
                </div>
                {/* Simulated model silhouette */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-48 bg-gradient-to-t from-emerald-950 to-emerald-800 rounded-t-full opacity-80"></div>
              </div>
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