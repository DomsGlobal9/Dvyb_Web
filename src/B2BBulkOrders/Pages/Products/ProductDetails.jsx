import React, { useState, useMemo } from 'react';
import { Package, ArrowLeft, ShoppingCart, Star, Heart, Shield, Truck, X, Eye, Plus, Minus } from 'lucide-react';
import { addToCart } from '../../../services/CartService';
import { useAuth } from '../../../context/AuthContext'; // Import useAuth to access user role

const ProductDetailPage = ({ product, onBackClick, allProducts = [], onNavigateToTryOn, onProductClick }) => {
  const { userData } = useAuth(); // Get userData from AuthContext
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(userData?.role === 'b2b' ? 11 : 1); // Default quantity: 11 for B2B, 1 for B2C
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!product) return null;

  // Calculate discounted price
  const originalPrice = parseFloat(product.price || 0);
  const discountPercent = product.discount || 0;
  const discountedPrice = originalPrice - (originalPrice * discountPercent / 100);

  // Get similar products based on exact color matching
  const similarProducts = useMemo(() => {
    console.log('=== SIMILAR PRODUCTS DEBUG ===');
    console.log('Total products:', allProducts.length);
    console.log('Current product ID:', product.id);
    console.log('Current product colors:', product.selectedColors);
    
    if (!allProducts.length) {
      console.log('No products available');
      return [];
    }
    
    if (!product.selectedColors || product.selectedColors.length === 0) {
      console.log('Current product has no colors, showing random products');
      const randomProducts = allProducts.filter(p => p.id !== product.id).slice(0, 8);
      console.log('Random products count:', randomProducts.length);
      return randomProducts;
    }
    
    const currentColors = product.selectedColors.map(c => c.toUpperCase().trim());
    console.log('Normalized current colors:', currentColors);
    
    const filtered = allProducts.filter(p => {
      if (p.id === product.id) return false;
      
      if (!p.selectedColors || p.selectedColors.length === 0) return false;
      
      const productColors = p.selectedColors.map(c => c.toUpperCase().trim());
      const hasCommonColor = currentColors.some(currentColor => 
        productColors.some(productColor => 
          currentColor === productColor || 
          currentColor.includes(productColor) || 
          productColor.includes(currentColor)
        )
      );
      
      if (hasCommonColor) {
        console.log(`Match found: ${p.title} - Colors: ${p.selectedColors.join(', ')}`);
      }
      
      return hasCommonColor;
    });
    
    console.log('Filtered similar products:', filtered.length);
    console.log('Similar products:', filtered.map(p => ({ title: p.title, colors: p.selectedColors })));
    
    return filtered.slice(0, 8);
  }, [product, allProducts]);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setShowAddToCartModal(true);
  };

  const handleConfirmAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    // Validate quantity based on user role
    if (userData?.role === 'b2b' && quantity <= 10) {
      alert('B2B users must select a quantity greater than 10');
      return;
    }
    if (userData?.role === 'b2c' && quantity > 10) {
      alert('B2C users cannot select a quantity greater than 10');
      return;
    }

    setIsAddingToCart(true);

    try {
      const productData = {
        name: product.title || product.name || 'Untitled Product',
        price: discountedPrice,
        image: product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : null,
        fabric: product.fabric ?? null,
        craft: product.craft ?? null,
        rating: product.rating ?? null,
        discount: product.discount ?? null,
        selectedColors: Array.isArray(product.selectedColors) ? product.selectedColors : [],
        color: product.selectedColors && product.selectedColors.length > 0 ? product.selectedColors[0] : null,
        size: selectedSize,
        freeShipping: product.freeShipping ?? false,
        shippingMessage: product.shippingMessage ?? null
      };

      await addToCart(product.id, productData, quantity); // Pass selected quantity
      setShowAddToCartModal(false);
      setSelectedSize('');
      setQuantity(userData?.role === 'b2b' ? 11 : 1); // Reset to default based on role
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(`Failed to add to cart: ${error.message}`);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleTryOnClick = () => {
    const garmentImage = product.imageUrls?.[0];
    if (!garmentImage) {
      alert('No image available for try-on');
      return;
    }
    
    if (onNavigateToTryOn) {
      onNavigateToTryOn({ garmentImage });
    }
  };

  const handleIncrement = () => {
    if (userData?.role === 'b2c' && quantity >= 10) return; // Max 10 for B2C
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity <= 1) return; // Minimum 1 for all users
    if (userData?.role === 'b2b' && quantity <= 11) return; // Minimum 11 for B2B
    setQuantity(prev => prev - 1);
  };

  const AddToCartModal = () => {
    if (!showAddToCartModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Select Size and Quantity</h3>
            <button onClick={() => setShowAddToCartModal(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Size</label>
            <select 
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select Any</option>
              {product.selectedSizes?.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))}
            </select>
          </div>

          

          <div className="flex gap-3">
            <button 
              onClick={handleTryOnClick}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              TRY ON
            </button>
            <button 
              onClick={handleConfirmAddToCart}
              disabled={isAddingToCart}
              className={`flex-1 py-3 px-6 rounded-lg font-medium flex items-center justify-center ${
                isAddingToCart ? 'bg-gray-400 cursor-not-allowed' : 'border border-gray-300 text-gray-700'
              }`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {isAddingToCart ? 'Adding...' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={onBackClick} className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="flex justify-end">
                <button onClick={() => setIsFavorite(!isFavorite)} className="p-2 rounded-full bg-gray-50">
                  <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                </button>
              </div>
              
              <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                {product.imageUrls?.length > 0 ? (
                  <img
                    src={product.imageUrls[selectedImageIndex] || product.imageUrls[0]}
                    alt={product.title || product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-20 h-20 text-gray-400" />
                  </div>
                )}
              </div>
              
              {product.imageUrls?.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.imageUrls.slice(0, 3).map((url, index) => (
                    <div 
                      key={index} 
                      className={`aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${
                        selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title || product.name}</h1>
                
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 4.5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{product.rating || '4.5'}</span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-blue-600">₹{Math.round(discountedPrice)}/</span>
                    <span className="text-lg text-gray-500">Piece</span>
                  </div>
                  
                  {discountPercent > 0 && (
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-lg text-gray-500 line-through">M.R.P ₹{Math.round(originalPrice)}</span>
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">({discountPercent}% OFF)</span>
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-600 mt-1">Tax included. Shipping calculated at checkout.</p>
                </div>
              </div>

              {product.selectedColors?.length > 0 && (
                
                <div className=' flex justify-between mr-12 '>
                  <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Colours Available</h3>
                  <div className="flex space-x-2">
                    {product.selectedColors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                  </div>
                  </div>
                  <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity {userData?.role === 'b2b' ? '(Minimum 11)' : '(Maximum 10)'}
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1 || (userData?.role === 'b2b' && quantity <= 11)}
                className={`p-2 border rounded-lg ${
                  quantity <= 1 || (userData?.role === 'b2b' && quantity <= 11)
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  if (userData?.role === 'b2b' && value <= 10) {
                    setQuantity(11);
                  } else if (userData?.role === 'b2c' && value > 10) {
                    setQuantity(10);
                  } else {
                    setQuantity(Math.max(1, value));
                  }
                }}
                className="w-16 p-2 border border-gray-300 rounded-lg text-center"
                min={userData?.role === 'b2b' ? 11 : 1}
                max={userData?.role === 'b2c' ? 10 : undefined}
              />
              <button
                onClick={handleIncrement}
                disabled={userData?.role === 'b2c' && quantity >= 10}
                className={`p-2 border rounded-lg ${
                  userData?.role === 'b2c' && quantity >= 10
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
                </div>
                
              )}

              <div className="space-y-3 flex gap-5">
                <button 
                  onClick={handleAddToCart} 
                  disabled={isAddingToCart}
                  className={`w-auto py-3 px-6 rounded-lg shadow-2xs font-medium flex items-center justify-center ${
                    isAddingToCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-white text-black border border-gray-300'
                  }`}
                >
                  <ShoppingCart className="h-5 mr-2" />
                  {isAddingToCart ? 'Adding...' : 'Add to cart'}
                </button>
                <button className="w-42 h-12 bg-[#1C4C74] shadow-2xs text-white py-3 px-6 rounded-lg hover:bg-orange-600 font-medium">
                  Buy Now
                </button>
              </div>

              <div className="space-y-3 text-sm pt-6">
                <div className="flex items-center text-gray-600">
                  <Shield className="w-4 h-4 mr-3" />
                  Secure payment
                </div>
                <div className="flex pl-12 items-center text-gray-600">
                  <Package className="w-4 h-4 mr-3" />
                  Free Size
                </div>
                <div className="flex items-center pt-5 text-gray-600">
                  <Truck className="w-4 h-4 mr-3" />
                  Free Shipping & Returns
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Product Description</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <p className="text-gray-600 text-sm">Crafted with intricate embroidery. Perfect for any occasion. Comfortable fit and vibrant colors.</p>
                
                <div className="mt-4 grid bg-blue-100 h-26 items-center p-7 grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Fabric:</div>
                    <div className="text-gray-600">{product.fabric || 'Premium'}</div>
                  </div>
                  <div>
                    <div className="font-medium">Pattern:</div>
                    <div className="text-gray-600">{product.craft || 'Printed'}</div>
                  </div>
                  <div>
                    <div className="font-medium">Fit:</div>
                    <div className="text-gray-600">Regular</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="w-48 h-64 bg-gray-100 rounded-lg overflow-hidden">
                  {product.imageUrls?.[0] ? (
                    <img src={product.imageUrls[0]} alt="Model" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-6">Similar Products</h3>
            
            {similarProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {similarProducts.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                      {item.discount > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded z-10">
                          -{item.discount}%
                        </span>
                      )}
                      
                      {item.imageUrls?.[0] ? (
                        <img src={item.imageUrls[0]} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <button className="p-2 bg-white rounded-full">
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-white rounded-full">
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-white rounded-full">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <h4 className="font-medium text-sm truncate mb-1">{item.title || item.name}</h4>
                      <div className="text-xs text-gray-500 mb-2">{item.fabric} • {item.craft}</div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-blue-600">₹{Math.round(item.price - (item.price * (item.discount || 0) / 100))}</span>
                        <button 
                          onClick={() => {
                            if (onProductClick) {
                              onProductClick(item);
                              window.scrollTo(0, 0);
                            }
                          }}
                          className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
                        >
                          View
                        </button>
                      </div>
                      
                      {item.selectedColors && (
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-gray-500 mr-2">Colors:</span>
                          <div className="flex space-x-1">
                            {item.selectedColors.slice(0, 3).map((color, index) => (
                              <div key={index} className="w-3 h-3 rounded-full border" style={{ backgroundColor: color.toLowerCase() }} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No similar products found. Total products available: {allProducts.length}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddToCartModal />
    </div>
  );
};

export default ProductDetailPage;