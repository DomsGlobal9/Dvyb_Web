import React, { useState } from 'react';
import { User, Ruler, Settings, Sparkles, Save, Download } from 'lucide-react';
import avatarLeftImg from "../../../assets/B2cAssets/LandingPageImges/sec07/YourPersonalizedAvatarImg.png"
import BodyType01 from "../../../assets/B2cAssets/LandingPageImges/sec07/BodyType01.png"
import BodyType02 from "../../../assets/B2cAssets/LandingPageImges/sec07/BodyType02.png"
import BodyType03 from "../../../assets/B2cAssets/LandingPageImges/sec07/BodyType03.png"
import BodyType04 from "../../../assets/B2cAssets/LandingPageImges/sec07/BodyType04.png"
// import BodyType04 from "../../../assets/B2cAssets/LandingPageImges/sec07/BodyType04.png"

function YourPersonlizedSection7() {
  const [selectedBodyType, setSelectedBodyType] = useState('HOURGLASS');

  const bodyTypes = [
    { id: 'HOURGLASS', label: 'HOURGLASS', img: BodyType01 },
    { id: 'PEAR', label: 'PEAR', img: BodyType02 },
    { id: 'APPLE', label: 'APPLE', img: BodyType03 },
    { id: 'RECTANGLE', label: 'RECTANGLE', img: BodyType04},
    { id: 'TRIANGLE', label: 'TRIANGLE', img: BodyType04 }
  ];

  const tabs = [
    { id: 'avatar', label: 'AVATAR', icon: User, active: true },
    { id: 'measurements', label: 'MEASUREMENTS', icon: Ruler, active: false },
    { id: 'preferences', label: 'PREFERENCES', icon: Settings, active: false },
    { id: 'ai-analysis', label: 'AI ANALYSIS', icon: Sparkles, active: false }
  ];

  return (
    <div className="min-h-screen  bg-white" style={{ fontFamily: "Outfit" }}> 
      <div className="max-w-7xl mx-auto px-4 py-2 lg:py-7">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white border border-gray-200 rounded-full px-4 py-2 mb-6">
            <span className="text-xs font-medium text-gray-600 tracking-wider">PERSONALIZATION HUB</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Personalized Avatar
          </h1>
          <p className="text-gray-600">
            Upload a photo → generate a realistic 3D avatar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-200 no-scrollbar">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      tab.active
                        ? 'border-gray-900 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Body Type Configuration */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">BODY TYPE CONFIGURATION</h3>
              
              {/* Body Type Options */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                {bodyTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedBodyType(type.id)}
                    className={`flex flex-col items-center transition-colors ${
                      selectedBodyType === type.id
                        ? 'border-red-400 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-18 h-22 mb-1 m-2 relative">
                      <img 
                        src={type.img} 
                        alt={type.label} 
                        className="w-full h-full object-contain rounded-lg "
                      />
                      {selectedBodyType === type.id && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-700">{type.label}</span>
                  </button>
                ))}
              </div>

              {/* Selected Profile Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-gray-900 mb-2">SELECTED: {selectedBodyType} PROFILE</h4>
                <p className="text-sm text-gray-600">
                  AI algorithms will optimize garment fitting based on your precise body configuration.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-teal-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>SAVE PROFILE</span>
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>EXPLORE DATA</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Avatar Preview */}
          <div className="space-y-6">
            {/* Avatar Display */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="aspect-[3/4] bg-gray-100 relative">
                <img 
                  src={avatarLeftImg}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
               
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors text-center">
                VIEW IN AR
              </button>
              <button className="border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors text-center">
                SHAPE PROFILE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourPersonlizedSection7;