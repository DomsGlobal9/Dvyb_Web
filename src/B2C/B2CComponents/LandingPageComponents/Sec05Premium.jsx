import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';

function PremiumSection05() {
  const products = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      accuracy: "99.5% FIT ACCURACY",
      name: "ROSE GRADIENT LEHENGA",
      originalPrice: "₹350,000",
      salePrice: "₹285,000",
      savings: "SAVE 19%"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      accuracy: "99.5% FIT ACCURACY",
      name: "ROSE GRADIENT LEHENGA",
      originalPrice: "₹350,000",
      salePrice: "₹285,000",
      savings: "SAVE 19%"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      accuracy: "99.5% FIT ACCURACY",
      name: "ROSE GRADIENT LEHENGA",
      originalPrice: "₹350,000",
      salePrice: "₹285,000",
      savings: "SAVE 19%"
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      accuracy: "99.5% FIT ACCURACY",
      name: "ROSE GRADIENT LEHENGA",
      originalPrice: "₹350,000",
      salePrice: "₹285,000",
      savings: "SAVE 19%"
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      accuracy: "99.5% FIT ACCURACY",
      name: "ROSE GRADIENT LEHENGA",
      originalPrice: "₹350,000",
      salePrice: "₹285,000",
      savings: "SAVE 19%"
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      accuracy: "99.5% FIT ACCURACY",
      name: "ROSE GRADIENT LEHENGA",
      originalPrice: "₹350,000",
      salePrice: "₹285,000",
      savings: "SAVE 19%"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4" style={{ fontFamily: "Outfit" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gray-100 rounded-full px-4 py-2 mb-6">
            <span className="text-xs font-medium text-gray-600 tracking-wider">CURATED COLLECTION</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PREMIUM SELECTIONS
          </h1>
          <p className="text-gray-600 mb-6">
            Indulge in our curated luxury collection, where fashion meets culture.
          </p>
          <div className="flex items-center justify-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
            <span className="font-medium">32,817 PRECISION FITTINGS COMPLETED TODAY</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center space-x-0.5 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">({product.rating})</span>
                </div>

                {/* Accuracy */}
                <div className="text-right mb-3">
                  <span className="text-xs text-gray-500 font-medium">{product.accuracy}</span>
                </div>

                {/* Product Name */}
                <h3 className="font-bold text-gray-900 mb-3 text-base tracking-wide">
                  {product.name}
                </h3>

                {/* Pricing */}
                <div className="mb-2">
                  <span className="font-bold text-gray-900 text-lg mr-3">{product.salePrice}</span>
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                </div>
                
                {/* Savings */}
                <div className="mb-4">
                  <span className="text-sm text-green-600 font-medium">{product.savings}</span>
                </div>

                {/* Buttons */}
                <div className="flex items-center space-x-3">
                  <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-3 px-4 rounded transition-colors duration-200 flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>ADD TO COLLECTION</span>
                  </button>
                  <button className="p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors duration-200">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PremiumSection05;