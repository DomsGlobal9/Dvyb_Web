import React from 'react';

const NewCollectionPage = () => {
  const products = [
    {
      id: 1,
      name: "Palazzo Saree",
      description: "Elegantly designed palazzo style",
      price: "₹2,999",
      originalPrice: "₹3,999",
      image: "bg-gradient-to-br from-pink-200 to-rose-300",
      modelBg: "bg-gradient-to-b from-pink-400 to-rose-600"
    },
    {
      id: 2,
      name: "Velour Suit",
      description: "Premium velour fabric drapes",
      price: "₹3,499",
      originalPrice: "₹4,499", 
      image: "bg-gradient-to-br from-red-800 to-red-900",
      modelBg: "bg-gradient-to-b from-red-600 to-red-800"
    },
    {
      id: 3,
      name: "Kaftan",
      description: "Traditional craft drapes",
      price: "₹2,299",
      originalPrice: "₹2,999",
      image: "bg-gradient-to-br from-red-500 to-red-600",
      modelBg: "bg-gradient-to-b from-red-400 to-red-600"
    },
    {
      id: 4,
      name: "Moortani Set",
      description: "Heritage inspired collection",
      price: "₹2,799",
      originalPrice: "₹3,499",
      image: "bg-gradient-to-br from-orange-300 to-orange-400",
      modelBg: "bg-gradient-to-b from-orange-400 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            NEW COLLECTION
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Discover fresh styles, trending colors, and handpicked pieces
            <br className="hidden sm:block" />
            curated for the new season.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              {/* Product Image */}
              <div className={`relative h-64 sm:h-72 lg:h-80 ${product.image} overflow-hidden`}>
                {/* Heart Icon */}
                <button className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 group-hover:scale-110">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Model Silhouette */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-24 sm:w-28 lg:w-32 h-48 sm:h-56 lg:h-64 ${product.modelBg} rounded-full opacity-80 shadow-2xl`}>
                    {/* Simulated draped fabric */}
                    <div className="absolute inset-2 bg-black bg-opacity-20 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 lg:w-24 h-32 sm:h-40 lg:h-48 bg-black bg-opacity-30 rounded-t-full"></div>
                  </div>
                </div>

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-5 transition-all duration-300"></div>
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
  );
};

export default NewCollectionPage;