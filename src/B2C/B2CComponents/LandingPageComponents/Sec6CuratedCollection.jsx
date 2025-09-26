import React from 'react';
import { ChevronRight } from 'lucide-react';

function CuratedCollectionSection6() {
  const collections = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=100",
      title: "SAREES & BLOUSES",
      description: "Traditional elegance for every occasion",
      items: "2,467 ITEMS",
      trending: true
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=100",
      title: "EVENING WEAR",
      description: "Contemporary sophistication for special occasions",
      items: "1,823 ITEMS",
      trending: false
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=100",
      title: "ETHNIC COLLECTION",
      description: "Heritage craftsmanship meets modern comfort",
      items: "3,891 ITEMS",
      trending: true
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=100",
      title: "PREMIUM FABRICS",
      description: "Finest materials for timeless creations",
      items: "567 ITEMS",
      trending: false
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=100",
      title: "LUXURY ACCESSORIES",
      description: "Perfect finishing touches for complete elegance",
      items: "2,945 ITEMS",
      trending: true
    }
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Outfit" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gray-100 rounded-full px-4 py-2 mb-6">
            <span className="text-xs font-medium text-gray-600 tracking-wider">PRODUCT CATEGORIES</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CURATED COLLECTIONS
          </h1>
          <p className="text-gray-600">
            Discover our exclusive collections, designed to suit every style and occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Collections List */}
          <div className="space-y-4">
            {collections.map((collection) => (
              <div key={collection.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {collection.title}
                        </h3>
                        {collection.trending && (
                          <span className="bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                            TRENDING
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {collection.description}
                      </p>
                      <p className="text-gray-500 text-xs font-medium">
                        {collection.items}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Featured Image and Stats */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Featured Collection"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">99.8%</div>
                <div className="text-sm text-gray-600 mb-1">FIT</div>
                <div className="text-sm text-gray-600 mb-3">PRECISION</div>
                <div className="text-xs text-teal-600 font-medium">accuracy</div>
              </div>
              <div className="text-center bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">4.9</div>
                <div className="text-sm text-gray-600 mb-1">QUALITY</div>
                <div className="text-sm text-gray-600 mb-3">RATING</div>
                <div className="text-xs text-teal-600 font-medium">star</div>
              </div>
              <div className="text-center bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">&lt; 2%</div>
                <div className="text-sm text-gray-600 mb-1">RETURN</div>
                <div className="text-sm text-gray-600 mb-3">RATE</div>
                <div className="text-xs text-teal-600 font-medium">with 3D</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CuratedCollectionSection6;