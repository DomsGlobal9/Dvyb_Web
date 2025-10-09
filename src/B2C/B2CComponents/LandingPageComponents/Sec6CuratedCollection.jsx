// CuratedCollectionSection6.jsx - FIXED VERSION

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import upward_ic from '../../../assets/B2cAssets/LandingPageImges/upward_ic.svg'

function CuratedCollectionSection6() {
  const navigate = useNavigate();

  const Sareepink = 'https://res.cloudinary.com/doiezptnn/image/upload/v1759311389/Frame_1984078362_mrvcto.png';
  const BlueHalfSaree = 'https://res.cloudinary.com/doiezptnn/image/upload/v1759311251/Frame_1984078362_pybd6d.png';
  const EthnicColl = 'https://res.cloudinary.com/doiezptnn/image/upload/v1759311096/imgs1_esjlgs.png';
  const PremiumFabrics = 'https://res.cloudinary.com/doiezptnn/image/upload/v1759311253/pentaloons_fmedex.png';
  const RigthImg = 'https://res.cloudinary.com/doiezptnn/image/upload/v1759311210/Rectangle_34624274_kv5dgp.png';

  const collections = [
    {
      id: 1,
      image: Sareepink,
      title: "SAREES & BLOUSES",
      categoryKey: "SAREES & BLOUSES", // This will be used for filtering
      description: "Traditional elegance for every occasion",
      items: "2,467 ITEMS",
      trending: true
    },
    {
      id: 3,
      image: EthnicColl,
      title: "ETHNIC COLLECTION",
      categoryKey: "ETHNIC COLLECTION",
      description: "Heritage craftsmanship meets modern comfort",
      items: "3,891 ITEMS",
      trending: true
    },
    {
      id: 4,
      image: PremiumFabrics,
      title: "PREMIUM FABRICS",
      categoryKey: "PREMIUM FABRICS",
      description: "Finest materials for timeless creations",
      items: "567 ITEMS",
      trending: false
    },
    {
      id: 5,
      image: Sareepink,
      title: "LUXURY ACCESSORIES",
      categoryKey: "LUXURY ACCESSORIES",
      description: "Perfect finishing touches for complete elegance",
      items: "2,945 ITEMS",
      trending: true
    }
  ];

  
  const handleNavigateProducts = (categoryKey) => {
    navigate(`/products?category=${encodeURIComponent(categoryKey)}`);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Outfit" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 p-1 mb-6">
            <span className="text-[16px] font-medium text-[#09545F] tracking-wider">PRODUCT CATEGORIES</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CURATED COLLECTIONS
          </h1>
          <p className="text-gray-600">
            Discover our exclusive collections, designed to suit every style <br /> and occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
          {/* Left Column - Collections List */}
        <div className="space-y-4">
  {collections.map((collection) => (
    <div 
      key={collection.id} 
      onClick={() => handleNavigateProducts(collection.categoryKey)} 
      className="border  border-gray-200 hover:border-[#265C64] hover:border-2 rounded-lg p-6 hover:shadow-sm transition-shadow cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start space-x-4 ">
          {/* Image */}
          <div className="w-24 h-24  overflow-hidden flex-shrink-0">
            <img 
              src={collection.image}
              alt={collection.title}
              
              className="w-full h-full object-cover"
            />
            
          </div>

          {/* Text block */}
          <div className="flex-1 flex flex-col  justify-between">
            {/* Title + Trending badge */}
            <div className="flex items-center lg:gap-36 gap-1 md:gap-64 justify-between mb-1">
              <h3 className="font-outfit md:w-48  font-semibold text-gray-900 text-xs md:text-lg">
                {collection.title}
              </h3>
              {collection.trending && (
                <span className="bg-[#3C8E9A] w-[104px] h-6 text-[12px] md:w-auto md:h-auto flex text-white text-xs font-outfit px-2 py-1 items-center gap-2 ">
                  <img src={upward_ic} alt="" className="w-5 h-5" /> 
                  <span>TRENDING</span>
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-2">
              {collection.description}
            </p>

            {/* Items count + arrow */}
            <div className="flex items-center  text-gray-700 text-sm font-medium">
              <span>{collection.itemsCount?.toLocaleString()|| 0 } Items</span>
              <ChevronRight className="w-5 h-5 ml-1 text-[#3C8E9A]  group-hover:text-gray-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

          {/* Right Column - Featured Image */}
          <div className="lg:-mt-11 lg:h-[64vh]">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={RigthImg}
                alt="Featured Collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CuratedCollectionSection6;