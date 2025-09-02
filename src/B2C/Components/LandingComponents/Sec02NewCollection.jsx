import React from 'react';
import banner01 from '../../../assets/B2Cassets/Banners/newCollectionBanner.png'
import slide01 from '../../../assets/B2Cassets/HomePageAssets/slide01.png'
import slide02 from '../../../assets/B2Cassets/HomePageAssets/slide02.png'
import slide03 from '../../../assets/B2Cassets/HomePageAssets/slide03.png'

const NewCollectionPage = () => {
  const products = [
    {
      id: 1,
      name: "Palazzo Saree",
      description: "Elegantly designed palazzo style",
      price: "₹2,999",
      originalPrice: "₹3,999",
      image: {slide01},
      modelBg: "bg-gradient-to-b from-pink-400 to-rose-600"
    },
    {
      id: 2,
      name: "Velour Suit",
      description: "Premium velour fabric drapes",
      price: "₹3,499",
      originalPrice: "₹4,499", 
      image: {slide02},
      modelBg: "bg-gradient-to-b from-red-600 to-red-800"
    },
    {
      id: 3,
      name: "Kaftan",
      description: "Traditional craft drapes",
      price: "₹2,299",
      originalPrice: "₹2,999",
      image: {slide03},
      modelBg: "bg-gradient-to-b from-red-400 to-red-600"
    },
    {
      id: 4,
      name: "Moortani Set",
      description: "Heritage inspired collection",
      price: "₹2,799",
      originalPrice: "₹3,499",
      image: {},
      modelBg: "bg-gradient-to-b from-orange-400 to-orange-600"
    }
  ];

  return (
  
  <>
      {/* Header Section */}
      <img src={banner01} alt="" />
  
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
             
              {/* Product Image */}
              <div className={`relative h-64 sm:h-72 lg:h-80 overflow-hidden`}>
                 <h1 className=''>{product.id}</h1>
                <img src= {product.image} alt="" />

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
                  
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Shop
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            View All Collection
          </button>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-pink-100 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-100 rounded-full opacity-25 animate-ping"></div>
      </div>
    </div>

    </>
  );
};

export default NewCollectionPage;