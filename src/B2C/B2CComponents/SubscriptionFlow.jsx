import React, { useState } from 'react';
import { CheckCircle, CreditCard, Smartphone, ArrowLeft, Star, Shield, Clock } from 'lucide-react';

const SubscriptionFlow = () => {
  const [currentStep, setCurrentStep] = useState(0); // Start with plan selection
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [formData, setFormData] = useState({
    upiId: '',
    accountHolder: '',
    accountNumber: '',
    confirmAccount: '',
    ifscCode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'gold',
      name: 'Gold',
      duration: 'Valid for 3 months',
      price: '₹2,999',
      period: 'for 3 months',
      stars: 3,
      color: 'yellow',
      perks: [
        'Free express delivery on all orders',
        'Free express delivery on all orders',
        'Priority customer support',
        'Free returns & replacements',
        'Surprise gift each month'
      ]
    },
    {
      id: 'silver',
      name: 'Silver',
      duration: 'Valid for 3 months',
      price: '₹1,999',
      period: 'for 3 months',
      stars: 3,
      color: 'gray',
      perks: [
        'Free standard delivery on orders above ₹999',
        'Access to subscriber-only discounts',
        'Early access to select sales',
        '1 free return per month',
        'Dedicated style suggestions'
      ]
    }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    setCurrentStep(1); // Move to payment selection
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
    setCurrentStep(2);
  };

  const handleFormSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setCurrentStep(3);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetFlow = () => {
    setCurrentStep(0);
    setSelectedPlan('');
    setSelectedPayment('');
    setFormData({
      upiId: '',
      accountHolder: '',
      accountNumber: '',
      confirmAccount: '',
      ifscCode: ''
    });
  };

  const renderStars = (count, color) => {
    return (
      <div className="flex space-x-1">
        {Array.from({ length: count }).map((_, index) => (
          <Star 
            key={index}
            className={`w-6 h-6 ${
              color === 'yellow' 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-400 fill-current'
            }`}
          />
        ))}
      </div>
    );
  };

  // Step 0: Plan Selection
  if (currentStep === 0) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Subscriptions</h2>
          <p className="text-sm text-gray-600">Manage your subscription plans</p>
        </div>

        <div className="space-y-4">
          {plans.map((plan) => (
            <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
                  <p className="text-sm text-gray-600">{plan.duration}</p>
                </div>
                {renderStars(plan.stars, plan.color)}
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Perks</h4>
                <ul className="space-y-1">
                  {plan.perks.map((perk, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-sm text-gray-600 ml-1">{plan.period}</span>
                </div>
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  // Step 1: Payment Method Selection
  if (currentStep === 1) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <button 
            onClick={() => setCurrentStep(0)}
            className="flex items-center text-blue-600 mb-4 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Subscriptions</h2>
          <p className="text-sm text-gray-600">Manage your subscription plans</p>
          
          {/* Selected Plan Summary */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-800">{selectedPlanData?.name} Plan</span>
                <div className="flex items-center mt-1">
                  {renderStars(selectedPlanData?.stars, selectedPlanData?.color)}
                </div>
              </div>
              <span className="text-lg font-bold text-gray-800">{selectedPlanData?.price}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {/* UPI Option */}
          <div 
            onClick={() => handlePaymentSelect('upi')}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
              selectedPayment === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-orange-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-800">UPI</h3>
                  <p className="text-sm text-gray-600">Instant & Secure</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Refund will be processed to your UPI within 1 business day after pickup is completed
            </p>
          </div>

          {/* Bank Account Option */}
          <div 
            onClick={() => handlePaymentSelect('bank')}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
              selectedPayment === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-800">Bank Account</h3>
                  <p className="text-sm text-gray-600">Direct Transfer</p>
                </div>
              </div>
              <Shield className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Refund will be processed to your UPI within 1 business day after pickup is completed
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>256-bit SSL encrypted payments</span>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Payment Details Form
  if (currentStep === 2) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <button 
            onClick={() => setCurrentStep(1)}
            className="flex items-center text-blue-600 mb-4 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Subscriptions</h2>
          <p className="text-sm text-gray-600">Manage your subscription plans</p>
        </div>

        <div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <div className="flex items-center">
                {selectedPayment === 'upi' ? (
                  <Smartphone className="w-5 h-5 text-orange-600 mr-2" />
                ) : (
                  <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                )}
                <span className="font-medium text-gray-800">
                  {selectedPayment === 'upi' ? 'UPI' : 'Bank Account'}
                </span>
              </div>
            </div>
            
            {selectedPayment === 'upi' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter UPI ID
                </label>
                <input
                  type="text"
                  placeholder="yourname@paytm"
                  value={formData.upiId}
                  onChange={(e) => handleInputChange('upiId', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Account Holder Name"
                    value={formData.accountHolder}
                    onChange={(e) => handleInputChange('accountHolder', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Account Number"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Confirm Account Number"
                    value={formData.confirmAccount}
                    onChange={(e) => handleInputChange('confirmAccount', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter IFSC Code"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleFormSubmit}
            disabled={isProcessing}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
              isProcessing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              'Buy Now'
            )}
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Success Page
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            {renderStars(selectedPlanData?.stars, selectedPlanData?.color)}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedPlanData?.name}</h2>
        </div>
        
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Subscription purchased successfully</span>
          </div>
          <p className="text-sm text-green-600">
            Welcome to {selectedPlanData?.name} tier! You now have access to premium features.
          </p>
        </div>
        
        <div className="space-y-3 mb-6">
          <button 
            onClick={resetFlow}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Manage Subscription
          </button>
          <button 
            onClick={resetFlow}
            className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          <p>Need help? <span className="text-blue-600 cursor-pointer hover:underline">Contact Support</span></p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionFlow;