import React, { useState } from 'react';
import { Gift, ChevronRight, Copy, Check, ShoppingCart, CreditCard, Tag, CheckCircle, AlertCircle } from 'lucide-react';

const RewardsRedemption = () => {
  const [selectedReward, setSelectedReward] = useState(null);
  const [copiedCode, setCopiedCode] = useState('');

  const rewards = [
    {
      id: 1,
      discount: '50% OFF',
      title: 'Discount',
      description: 'All online purchases',
      validTill: 'Valid till 25-12-2025',
      code: 'OFF50',
      icon: Gift,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 2,
      discount: '25% OFF',
      title: 'Discount', 
      description: 'On all products',
      validTill: 'Valid till 27-12-2024',
      code: 'OFF25',
      icon: Tag,
      color: 'bg-green-100 text-green-600'
    }
  ];

  const handleRewardClick = (reward) => {
    setSelectedReward(reward);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const handleBackToRewards = () => {
    setSelectedReward(null);
    setCopiedCode('');
  };

  // Reward Details View
  if (selectedReward) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <button 
            onClick={handleBackToRewards}
            className="flex items-center text-blue-600 mb-4 hover:text-blue-700"
          >
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            Back
          </button>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Rewards</h2>
          <p className="text-sm text-gray-600">Redeem your reward points</p>
        </div>

        {/* Reward Details Card */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedReward.color}`}>
              <selectedReward.icon className="w-5 h-5" />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-800">{selectedReward.discount} {selectedReward.title}</h3>
              <p className="text-sm text-gray-600">{selectedReward.description}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">{selectedReward.validTill}</p>
        </div>

        {/* Code Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
            <div>
              <span className="text-sm text-gray-600">Code: </span>
              <span className="font-mono font-bold text-gray-800">{selectedReward.code}</span>
            </div>
            <button
              onClick={() => handleCopyCode(selectedReward.code)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                copiedCode === selectedReward.code
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copiedCode === selectedReward.code ? (
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

        {/* How to Use Section */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">How to Use</h3>
          <div className="space-y-2">
            {[
              'Add items to Cart',
              'Proceed to Checkout',
              'Apply Reward Code',
              'Verify Discount',
              'Complete Payment'
            ].map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Terms & Conditions</h3>
          <div className="space-y-2">
            {[
              'Not applicable on discounted items',
              'Cannot be redeemed for cash',
              'Minimum order value: ₹999',
              'Usage limited to one reward per transaction'
            ].map((term, index) => (
              <div key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">{term}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Shop Now
          </button>
          <button 
            onClick={handleBackToRewards}
            className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            View More Rewards
          </button>
        </div>
      </div>
    );
  }

  // Main Rewards List View
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Rewards</h2>
        <p className="text-sm text-gray-600">Redeem your reward points</p>
      </div>

      <div className="space-y-4">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            onClick={() => handleRewardClick(reward)}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${reward.color}`}>
                <reward.icon className="w-5 h-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-gray-800">{reward.discount} {reward.title}</h3>
                <p className="text-sm text-gray-600">{reward.description}</p>
                <p className="text-xs text-gray-500">{reward.validTill}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Points Balance (Optional) */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600">Available Points</p>
            <p className="text-2xl font-bold text-blue-800">2,500</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Gift className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <p className="text-xs text-blue-600 mt-2">Earn more points with every purchase</p>
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Earned 250 points</p>
                <p className="text-xs text-gray-500">Purchase #12345 • 2 days ago</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Tag className="w-4 h-4 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Redeemed OFF25</p>
                <p className="text-xs text-gray-500">Saved ₹500 • 5 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsRedemption;