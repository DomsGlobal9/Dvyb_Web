import React, { useEffect, useRef, useState } from 'react';
import banner01 from '../../assets/B2Bassets/Banners/newCollectionBanner.png'
import slide01 from  '../../assets/B2Bassets/HomePageAssets/slide01.png'
import slide02 from  '../../assets/B2Bassets/HomePageAssets/slide02.png'
import slide03 from  '../../assets/B2Bassets/HomePageAssets/slide03.png'
import { useNavigate } from 'react-router-dom';
import { products } from '../../../StaticData/newCollectionData'

const NewCollectionPage = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isHovered && scrollContainer) {
          const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          
          // If we've reached the end, reset to beginning
          if (scrollContainer.scrollLeft >= maxScrollLeft) {
            scrollContainer.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          } else {
            // Scroll by one card width (approximately 300px including gap)
            scrollContainer.scrollBy({
              left: 320,
              behavior: 'smooth'
            });
          }
        }
      }, 3000); // Scroll every 3 seconds
    };

    startAutoScroll();

    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {/* Header Section */}
      <img src={banner01} alt="" />
  
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Products Grid with Horizontal Scroll */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {products.map((product) => (
              <div 
                key={product.id}
                className="group bg-white rounded-2xl w-72 flex-shrink-0 hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
               
                {/* Product Image */}
                <div className="relative h-64 sm:h-72 lg:h-72 overflow-hidden">
                  <img src={product.imageUrls} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Product Details */}
                <div className="p-4 sm:p-6">
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                    
                    <button 
                      // onClick={() => navigate(`/products/${product.id}`)}
                      className="bg-primary-blue text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots (Optional) */}
          <div className="flex justify-center mt-6 space-x-2">
            {products.map((_, index) => (
              <div 
                key={index}
                className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
                style={{
                  animationDelay: `${index * 0.5}s`
                }}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <button 
              onClick={() => navigate("/products")}
              className="bg-primary-blue hover:bg-gray-800 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              View All Collection
            </button>
          </div>
        </div>
      </div>

      {/* Add custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default NewCollectionPage;