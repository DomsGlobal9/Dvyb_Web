import React, { useState } from 'react';
import { Copy, Check, Share2, X, MessageCircle, Mail, Camera, Users, Heart, Send } from 'lucide-react';
import earnImg from "../../assets/ProfileImages/earn&refer.png"

const ReferEarn = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedApp, setSelectedApp] = useState('');

  const referralCode = 'abcdef';
  const reward = '250';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleAppShare = (app) => {
    setSelectedApp(app);
    const message = `Hey! Join this amazing app using my referral code: ${referralCode} and get ₹${reward}!`;
    
    // Simulate sharing (in real app, use actual sharing APIs)
    console.log(`Sharing via ${app}:`, message);
    
    // Close modal after selection
    setTimeout(() => {
      setShowShareModal(false);
      setSelectedApp('');
    }, 500);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500',
      textColor: 'text-white'
    },
    {
      name: 'Messages',
      icon: MessageCircle,
      color: 'bg-blue-500',
      textColor: 'text-white'
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600',
      textColor: 'text-white'
    },
    {
      name: 'LinkedIn',
      icon: Users,
      color: 'bg-blue-700',
      textColor: 'text-white'
    },
    {
      name: 'Gmail',
      icon: Mail,
      color: 'bg-red-500',
      textColor: 'text-white'
    },
    {
      name: 'Instagram',
      icon: Camera,
      color: 'bg-pink-500',
      textColor: 'text-white'
    },
    {
      name: 'Facebook',
      icon: Heart,
      color: 'bg-blue-600',
      textColor: 'text-white'
    },
    {
      name: 'Snapchat',
      icon: Camera,
      color: 'bg-yellow-400',
      textColor: 'text-black'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Mobile Container */}
      <div className="max-w-sm mx-auto bg-white min-h-screen relative">
        
        {/* Header */}
        <div className="p-4 bg-white">
          <h1 className="text-xl font-semibold text-gray-800">Refer & Earn</h1>
          <p className="text-sm text-gray-600">Refer friends & earn rewards</p>
        </div>

        {/* Main Content */}
        <div className="px-4 pb-4">
          
         <img src={earnImg} alt="" />

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
            Invite your friends and get ₹{reward} each
          </h2>
          
          {/* Description */}
          <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
            Share the code below or ask them to enter it during the signup. Earn when your friends signs up on our app
          </p>

          {/* Code Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
              <div>
                <span className="text-sm text-gray-600">Code: </span>
                <span className="font-mono font-bold text-gray-800 text-lg">{referralCode}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  copiedCode
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copiedCode ? (
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    Copied
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Invite Button */}
          <button
            onClick={handleShare}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Invite Friend
          </button>

          {/* Stats Section */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-xs text-gray-500">Friends Invited</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-xs text-gray-500">Successfully Joined</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">₹750</div>
              <div className="text-xs text-gray-500">Total Earned</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="font-medium text-gray-800 mb-3">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Raj joined!</p>
                    <p className="text-xs text-gray-500">+₹250 earned</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">2h ago</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Invited Priya</p>
                    <p className="text-xs text-gray-500">via WhatsApp</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">1d ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
            <div className="bg-white rounded-t-3xl w-full max-w-sm animate-slide-up">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Share Referral Code via</h3>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  {shareOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => handleAppShare(option.name)}
                      className={`flex flex-col items-center p-3 rounded-lg transition-all hover:scale-105 ${
                        selectedApp === option.name ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center mb-2`}>
                        <option.icon className={`w-6 h-6 ${option.textColor}`} />
                      </div>
                      <span className="text-xs text-gray-600">{option.name}</span>
                    </button>
                  ))}
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleShare}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Invite Friend
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ReferEarn;