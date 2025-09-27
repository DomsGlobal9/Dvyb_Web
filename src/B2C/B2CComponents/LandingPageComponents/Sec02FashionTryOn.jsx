import React from 'react';
import { ArrowRight, Users, Target, Award } from 'lucide-react';

const FashionTryOnSection = () => {
  return (
    <div className="min-h-screen">
      {/* Main Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Technology Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600 tracking-wide">
                TECHNOLOGY REDEFINED
              </span>
            </div>
            
            {/* Excellence Badge */}
            <div className="bg-gray-900 text-white px-6 py-3 rounded-lg inline-block">
              <span className="text-lg font-bold tracking-wide">EXCELLENCE</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                EXPERIENCE FASHION
                <br />
                LIKE NEVER BEFORE
              </h1>
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900">
                TRY ON
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-lg text-gray-700 max-w-md">
              Step Into The Future Of Shopping - Try Outfits On Your 
              3D Avatar Before You Buy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200 group">
                Try It Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 group">
                EXPLORE COLLECTIONS
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

      
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {/* Stat 1 */}
          <div className="text-center space-y-2">
            <div className="text-5xl lg:text-6xl font-bold text-gray-900">
              247,893<span className="text-teal-500">+</span>
            </div>
            <p className="text-gray-600 font-medium">Happy Virtual Shoppers</p>
          </div>

          {/* Stat 2 */}
          <div className="text-center space-y-2">
            <div className="text-5xl lg:text-6xl font-bold text-gray-900">
              99.97<span className="text-teal-500">%</span>
            </div>
            <p className="text-gray-600 font-medium">Accuracy Rate</p>
          </div>

          {/* Stat 3 */}
          <div className="text-center space-y-2">
            <div className="text-5xl lg:text-6xl font-bold text-gray-900">
              150<span className="text-teal-500">+</span>
            </div>
            <p className="text-gray-600 font-medium">Luxury Partners</p>
          </div>
        </div>
      </div>

      {/* Interactive Experience Section */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-16">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-gray-600 tracking-wide">
                INTERACTIVE EXPERIENCE
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              See How Precision Try on Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of fashion with our proprietary 3D try-on. See how garments 
              look on finish more confidence with every style choice.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Step 1 */}
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">Create Your Avatar</h3>
                <p className="text-gray-600">Upload your photo and create a personalized 3D avatar</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">Select & Try On</h3>
                <p className="text-gray-600">Choose from thousands of outfits and see them on your avatar</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">Perfect Fit</h3>
                <p className="text-gray-600">Get accurate fit predictions and shop with confidence</p>
              </div>
            </div>
          </div>

          {/* Demo CTA */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              Start Your Virtual Try-On Experience
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "👗", title: "Virtual Wardrobe", desc: "Try thousands of styles instantly" },
              { icon: "📐", title: "Perfect Sizing", desc: "AI-powered fit recommendations" },
              { icon: "🎨", title: "Style Matching", desc: "Personalized outfit suggestions" },
              { icon: "💫", title: "Real-time Preview", desc: "See changes in real-time 3D" }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionTryOnSection;