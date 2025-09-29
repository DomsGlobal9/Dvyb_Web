import React from 'react';
import { Camera, Cog, Smartphone, Zap, ArrowRight } from 'lucide-react';
import avatarLeftImg from "../../../assets/B2cAssets/LandingPageImges/sec04/3DAvatarImage.png"


function TechnologySection04() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Outfit" }}>
      {/* Header Tag */}
      <div className="flex justify-center mt-14">
        <div className="bg-white border border-gray-200  px-4 py-2">
          <span className="text-xs font-medium text-gray-600 tracking-wider">TECHNOLOGY DEEP DIVE</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            The Technology Behind 3D Try-On
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the cutting-edge technology that transforms how you experience fashion. Every 
            detail engineered for absolute perfection.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side - Features List */}
          <div className="space-y-6">
            {/* Feature 01 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
              <div className="absolute -left-3 top-6 bg-white border border-gray-200 rounded px-2 py-1">
                <span className="text-sm font-medium text-gray-500">01</span>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 rounded-lg p-3 mt-1">
                    <Camera className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">PRECISION SCANNING</h3>
                    <p className="text-sm text-gray-600 mb-3">Advanced computer vision creates exact body measurements.</p>
                    <p className="text-sm text-gray-600">
                      Our proprietary technology captures over 30 precise measurements using cutting-edge AI 
                      algorithms for unparalleled accuracy.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 mt-6 flex-shrink-0" />
              </div>
            </div>

            {/* Feature 02 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
              <div className="absolute -left-3 top-6 bg-white border border-gray-200 rounded px-2 py-1">
                <span className="text-sm font-medium text-gray-500">02</span>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 rounded-lg p-3 mt-1">
                    <Cog className="w-5 h-5 text-gray-700" />   
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Physics</h3>
                    <p className="text-sm text-gray-600 mb-3">Experience authentic fabric behaviour and draping.</p>
                    <p className="text-sm text-gray-600">
                      Sophisticated physics simulation renders how premium fabrics move, stretch, and respond to 
                      your body's unique form.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 mt-6 flex-shrink-0" />
              </div>
            </div>

            {/* Feature 03 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
              <div className="absolute -left-3 top-6 bg-white border border-gray-200 rounded px-2 py-1">
                <span className="text-sm font-medium text-gray-500">03</span>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 rounded-lg p-3 mt-1">
                    <Smartphone className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Seamless Integration</h3>
                    <p className="text-sm text-gray-600 mb-3">Transform any device into a premium fitting room.</p>
                    <p className="text-sm text-gray-600">
                      Revolutionary augmented reality technology delivers studio-quality try-on experiences 
                      anywhere, anytime.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 mt-6 flex-shrink-0" />
              </div>
            </div>

            {/* Feature 04 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
              <div className="absolute -left-3 top-6 bg-white border border-gray-200 rounded px-2 py-1">
                <span className="text-sm font-medium text-gray-500">04</span>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 rounded-lg p-3 mt-1">
                    <Zap className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Prediction</h3>
                    <p className="text-sm text-gray-600 mb-3">Immediate fit analysis and style recommendations.</p>
                    <p className="text-sm text-gray-600">
                      Machine learning processes thousands of data points to deliver confident purchasing 
                      decisions in milliseconds.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 mt-6 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Right Side - Image and Comparison */}
          <div className="space-y-8">
            {/* Main Image */}
            <div className="relative">
              <img 
                src={avatarLeftImg}
                alt="Woman in traditional Indian dress"
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Comparison Section */}
            <div className="flex gap-4">
              <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4 text-center">
                <h4 className="font-medium text-gray-900 mb-1">Traditional</h4>
                <p className="text-sm text-gray-600">Uncertain Fitting</p>
              </div>
              <div className="flex-1 bg-teal-600 rounded-lg p-4 text-center text-white">
                <h4 className="font-medium mb-1">3D PRECISION</h4>
                <p className="text-sm">Guaranteed Perfect Fit</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-4 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <span>EXPERIENCE THE TECHNOLOGY</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TechnologySection04;