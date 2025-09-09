import React from 'react';
import { ChevronRight } from 'lucide-react';
import categoriesBanner from '../../assets/B2Bassets/Banners/CategoriesBanner.png';

const FashionCategories = () => {
  const categories = [
    {
      id: 1,
      title: "SAREES",
      bgColor: "bg-gray-100",
      textColor: "text-gray-700",
      showButton: true,
      image: "https://res.cloudinary.com/doiezptnn/image/upload/v1756711125/sareeCollection_eztx2i.png",
      description: "Elegant traditional sarees",
      colSpan: "lg:col-span-2" // This will make it span 2 columns on large screens
    },
    {
      id: 2,
      title: "Salwar",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      showButton: false,
      image: "https://res.cloudinary.com/doiezptnn/image/upload/v1756711151/SalwarCollection_fa4lzz.png",
      description: "Comfortable salwar kameez",
      colSpan: ""
    },
    {
      id: 3,
      title: "Anarkalis",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      showButton: false,
      image: "https://res.cloudinary.com/doiezptnn/image/upload/v1756711163/anarkalisCollection_scy285.png",
      description: "Graceful Anarkali suits",
      colSpan: ""
    },
    {
      id: 4,
      title: "Gowns",
      bgColor: "bg-rose-100",
      textColor: "text-rose-800",
      showButton: false,
      image: "https://res.cloudinary.com/doiezptnn/image/upload/v1756711137/GownsCollection_zwrhtl.png",
      description: "Stunning evening gowns",
      colSpan: ""
    },
    {
      id: 5,
      title: "Ethnic Jackets",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      showButton: false,
      image: "https://res.cloudinary.com/doiezptnn/image/upload/v1756711378/jacket_n5n8zz.png",
      description: "Ornate ethnic jackets",
      colSpan: ""
    },
    {
      id: 6,
      title: "Lehengas",
      bgColor: "bg-pink-100",
      textColor: "text-pink-800",
      showButton: true,
      image: "https://res.cloudinary.com/doiezptnn/image/upload/v1756711145/lehengaCollection_rsm0yj.png",
      description: "Beautiful traditional lehengas",
      colSpan: "lg:col-span-2" // This will make it span 2 columns on large screens
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <img src={categoriesBanner} alt="Fashion Categories" className="w-full" />
     
      <div className="relative pb-16 px-4">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/30 rounded-full blur-sm"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200/40 rounded-full blur-md"></div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${category.bgColor} ${category.colSpan} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group`}
            >
              <div className="p-6 h-full flex flex-col md:flex-row">
                {/* Text Content */}
                <div className="flex flex-col justify-between mb-4 md:mb-0 md:mr-4 flex-1">
                  <h3 className={`text-2xl md:text-3xl font-medium ${category.textColor} mb-4`}>
                    {category.title}
                  </h3>
                  {category.showButton && (
                    <button className="self-start bg-white/80 hover:bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 hover:scale-105">
                      SHOP NOW
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>

                {/* Image Container */}
                <div className="flex-1 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.description}
                    className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      {/* <div className="bg-gradient-to-r from-blue-50 to-pink-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
            Discover Your Perfect Style
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            From traditional elegance to contemporary chic, find outfits that express your unique personality and grace every special moment.
          </p>
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg">
            Explore All Collections
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default FashionCategories;