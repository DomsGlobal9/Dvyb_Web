import React, { useState, useEffect } from 'react';
import { Share2, Trash2, X, MessageCircle, Mail, Facebook, Link } from 'lucide-react';
import { subscribeToCart, removeFromCart } from '../../services/CartService';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;

    const setupSubscription = async () => {
      try {
        unsubscribe = await subscribeToCart((items) => {
          setCartItems(items);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error setting up cart subscription:', error);
        setIsLoading(false);
      }
    };

    setupSubscription();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const removeItem = async (productId) => {
    try {
      await removeFromCart(productId);
      // Real-time listener will automatically update the cart
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert(`Failed to remove item: ${error.message}`);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  const shipping = cartItems.some(item => !item.freeShipping) ? 50 : 0;
  const grandTotal = subtotal + shipping;

  const ShareModal = () => (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-sm w-full max-h-[98vh] border border-[0.5px]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <Share2 className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">Share Cart</span>
          </div>
          <button
            onClick={() => setShowShareModal(false)}
            className="p-1 cursor-pointer hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Cart Summary */}
          <div>
            <p className="text-sm text-gray-600 mb-3">Total Products: {cartItems.length}</p>
            
            {/* Product Images */}
            <div className="flex space-x-2 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="relative">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={item.image || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <span className="text-xs bg-white px-1 py-0.5 rounded shadow text-gray-700">
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm font-medium text-gray-900 mb-4">
              Total Amount: ₹{grandTotal.toLocaleString()}
            </p>
          </div>

          {/* Share Options */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Share Via:</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <button className="flex flex-col items-center space-y-1 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-gray-700">WhatsApp</span>
              </button>
              
              <button className="flex flex-col items-center space-y-1 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-gray-700">Gmail</span>
              </button>
              
              <button className="flex flex-col items-center space-y-1 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Facebook className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-gray-700">Facebook</span>
              </button>
              
              <button className="flex flex-col items-center space-y-1 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                  <Link className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-gray-700">Copy Link</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="text-center text-sm text-gray-500 py-2">
            Or
          </div>

          {/* QR Code Section */}
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Scan QR Code</h3>
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-28 h-28 bg-black relative overflow-hidden">
                  <div className="absolute inset-0 opacity-90">
                    <div className="grid grid-cols-8 gap-0 h-full w-full">
                      {Array.from({ length: 64 }, (_, i) => (
                        <div
                          key={i}
                          className={`${
                            Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-1 left-1 w-6 h-6 border-2 border-white">
                    <div className="w-2 h-2 bg-white m-1"></div>
                  </div>
                  <div className="absolute top-1 right-1 w-6 h-6 border-2 border-white">
                    <div className="w-2 h-2 bg-white m-1"></div>
                  </div>
                  <div className="absolute bottom-1 left-1 w-6 h-6 border-2 border-white">
                    <div className="w-2 h-2 bg-white m-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-gray-600">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4 flex justify-between items-center">
        <h1></h1>
          <button 
            onClick={() => setShowShareModal(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Share2 className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Cart Table */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="text-sm text-gray-600">Start adding items to see them here!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            {/* Table Header - Desktop */}
            <div className="hidden lg:grid lg:grid-cols-12 bg-[rgba(0,94,153,1)] text-white text-sm font-medium py-4 px-6">
              <div className="col-span-5">PRODUCT DETAILS</div>
              <div className="col-span-2 text-center">PRICE</div>
              <div className="col-span-1 text-center">SIZE</div>
              <div className="col-span-2 text-center">SUBTOTAL</div>
              <div className="col-span-2 text-center">ACTION</div>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 lg:p-6">
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 items-center gap-4">
                    <div className="col-span-5 flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                        <img 
                          src={item.image || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Color: {item.color || 'N/A'}</p>
                        {item.shippingMessage && (
                          <p className="text-xs text-orange-600 mt-1">{item.shippingMessage}</p>
                        )}
                        {item.freeShipping && (
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                            FREE SHIPPING
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-medium">₹{(item.price || 0).toLocaleString()}</span>
                    </div>
                    <div className="col-span-1 text-center">
                      <span className="font-medium">{item.size || 'N/A'}</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-medium">₹{(item.subtotal || 0).toLocaleString()}</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-3">
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                        <img 
                          src={item.image || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Color: {item.color || 'N/A'}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-600">Size: {item.size || 'N/A'}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Price: ₹{(item.price || 0).toLocaleString()}</span>
                      <span className="font-medium">Subtotal: ₹{(item.subtotal || 0).toLocaleString()}</span>
                    </div>
                    {item.shippingMessage && (
                      <p className="text-xs text-orange-600">{item.shippingMessage}</p>
                    )}
                    {item.freeShipping && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        FREE SHIPPING
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Discount Codes */}
          <div className="lg:col-span-2 bg-[#F6F6F6] rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Discount Codes</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your coupon code if you have one"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors">
                  Apply Coupon
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Sub Total</span>
                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">₹{shipping}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>
              <button className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition-colors font-medium">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      {showShareModal && <ShareModal />}
    </div>
  );
}

export default CartPage;