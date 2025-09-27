import React from 'react';
import { ArrowRight } from 'lucide-react';
import fashion from "../../../assets/B2cAssets/LandingPageImges/fastionBreand.png"

const FashionBrandsSection = () => {
  const brandData = [
    {
      id: 1,
      title: "LUXURY FASHION EXECUTIVE",
      description: "Precision technology that transforms luxury fashion selection.",
      status: "Industry Leader",
      precision: "99.8%",
      image: fashion
    },
    {
      id: 2,
      title: "FASHION TECHNOLOGY PIONEER", 
      description: "Revolutionary approach to personalised fashion intelligence.",
      status: "Innovation Award",
      precision: "99.9%",
      image: fashion
    },
    {
      id: 3,
      title: "LUXURY FASHION EXECUTIVE",
      description: "Precision technology that transforms luxury fashion selection.",
      status: "Industry Leader", 
      precision: "99.8%",
      image: fashion
    }
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Trusted by Leading Fashion Brands
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Where luxury fashion meets business intelligence for lasting success.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {brandData.map((brand) => (
            <div key={brand.id} className="bg-white  shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image Container */}
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-100 p-8 h-80">
              <img src={brand.image} alt="" />
             
                
          
               
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 tracking-wider">
                  {brand.title}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {brand.description}
                </p>
                              <div className='border-t border-b-gray-300 w-full'></div>
                {/* Stats */}
                <div className="flex justify-between pt-5 items-end">
                  <div>
                    <p className="text-sm text-start text-gray-500 uppercase tracking-wider mb-1">
                      STATUS
                    </p>
                    <p className="text-sm font-medium pt-3 text-gray-900">
                      {brand.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-start text-gray-500 uppercase tracking-wider mb-1">
                      PRECISION
                    </p>
                    <p className="text-sm font-semibold pt-3 text-gray-900">
                      {brand.precision}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="inline-flex items-center gap-3 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4  font-medium text-sm uppercase tracking-wider transition-colors duration-200">
            PARTNER WITH INDUSTRY LEADERS
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-sm text-gray-600 mt-6  mx-auto">
            The choice of forward-thinking executives seeking excellence in fashion technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FashionBrandsSection;