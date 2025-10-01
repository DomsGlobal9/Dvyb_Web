import React, { useState, useMemo, useEffect } from 'react';
import { Package, ArrowLeft, ShoppingCart, Star, Heart, Shield, Truck, X, Eye } from 'lucide-react';
import TryYourOutfitModal from './Models/TryYourOutfitModal';
import UploadSelfieModal from './Models/UploadSelfieModal';
import TryOnPreviewModal from './Models/TryOnPreviewModal';
import { useAuth } from '../../../context/AuthContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { colorUtils } from '../../../utils/colorUtils';
import { addToCart } from '../../../services/CartService';

const ProductDetailPage = ({ product, onBackClick, allProducts = [], onNavigateToTryOn, onProductClick }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const { user } = useAuth();

  // Modal states
  const [showTryYourOutfitModal, setShowTryYourOutfitModal] = useState(false);
  const [showUploadSelfieModal, setShowUploadSelfieModal] = useState(false);
  const [showTryOnPreviewModal, setShowTryOnPreviewModal] = useState(false);
  const [tryOnData, setTryOnData] = useState({});

  // Set default color when component loads
  useEffect(() => {
    if (product?.selectedColors?.length > 0 && !selectedColor) {
      setSelectedColor(product.selectedColors[0]);
    }
  }, [product, selectedColor]);

  useEffect(() => {
    const isAnyModalOpen =
      showTryYourOutfitModal || showUploadSelfieModal || showTryOnPreviewModal || showAddToCartModal;

    if (isAnyModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [showTryYourOutfitModal, showUploadSelfieModal, showTryOnPreviewModal, showAddToCartModal]);

  if (!product) return null;

  // Calculate discounted price
  const originalPrice = parseFloat(product.price || 0);
  const discountPercent = product.discount || 0;
  const discountedPrice = originalPrice - (originalPrice * discountPercent / 100);

  // Get similar products based on exact color matching
  const similarProducts = useMemo(() => {
    if (!allProducts.length) return [];

    if (!product.selectedColors || product.selectedColors.length === 0) {
      return allProducts.filter(p => p.id !== product.id).slice(0, 8);
    }

    const currentColors = product.selectedColors.map(c => c.toUpperCase().trim());

    const filtered = allProducts.filter(p => {
      if (p.id === product.id) return false;
      if (!p.selectedColors || p.selectedColors.length === 0) return false;

      const productColors = p.selectedColors.map(c => c.toUpperCase().trim());
      return currentColors.some(currentColor =>
        productColors.some(productColor =>
          currentColor === productColor ||
          currentColor.includes(productColor) ||
          productColor.includes(currentColor)
        )
      );
    });

    return filtered.slice(0, 8);
  }, [product, allProducts]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to cart!");
      return;
    }
    setShowAddToCartModal(true);
  };

  // MAIN FIX: Properly add item to cart with correct data structure
  // Check if product is a saree (case-insensitive)
  const isSaree = (product.title || product.name || '').toLowerCase().includes('saree') ||
                  (product.fabric || '').toLowerCase().includes('saree') ||
                  (product.craft || '').toLowerCase().includes('saree');

  const handleConfirmAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to continue!");
      return;
    }

    // Only require size selection if product is not a saree
    if (!isSaree && !selectedSize) {
      toast.warning("Please select a size first!");
      return;
    }

    if (addingToCart) return;

    try {
      setAddingToCart(true);

      // Prepare product data matching CartService expectations
      const productData = {
        // Basic product info
        name: product.name || product.title,
        title: product.title || product.name,
        price: parseFloat(product.price) || 0,
        
        // Selected attributes
        size: isSaree ? 'Free Size' : selectedSize,
        color: selectedColor || (product.selectedColors?.[0] || ''),
        
        // Image for cart display (single image, not array)
        image: product.imageUrls?.[0] || '',
        
        // All available options (keep as arrays)
        imageUrls: product.imageUrls || [],
        selectedColors: product.selectedColors || [],
        selectedSizes: product.selectedSizes || [],
        
        // Product details
        fabric: product.fabric || '',
        craft: product.craft || '',
        description: product.description || '',
        
        // Calculate subtotal (price * quantity)
        subtotal: parseFloat(product.price) || 0,
        
        // Shipping info
        freeShipping: parseFloat(product.price) > 500,
        shippingMessage: parseFloat(product.price) > 500 
          ? null 
          : 'Add ₹' + (500 - parseFloat(product.price)) + ' more for free shipping',
        
        // Discount info (optional)
        discount: product.discount || 0,
        originalPrice: originalPrice
      };

      // Call the cart service - it handles quantity and final calculations
      await addToCart(product.id, productData, 1);
      
      const sizeDisplay = isSaree ? '' : ` (${selectedSize})`;
      toast.success(`${productData.name}${sizeDisplay} (${selectedColor}) added to cart!`);
      setShowAddToCartModal(false);
      setSelectedSize('');
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      
      // More specific error messages
      if (error.message.includes("User not found")) {
        toast.error("User account not found. Please log in again.");
      } else if (error.message.includes("authenticated")) {
        toast.error("Please log in to add items to cart.");
      } else {
        toast.error("Failed to add item to cart. Please try again.");
      }
    } finally {
      setAddingToCart(false);
    }
  };

  const handleTryOnClick = () => {
    const garmentImage = product.imageUrls?.[0];
    if (!garmentImage) {
      toast.error('No image available for try-on');
      return;
    }

    setTryOnData({ garmentImage });
    setShowTryYourOutfitModal(true);
  };

  const handleTryYourOutfitNext = (data) => {
    setShowTryYourOutfitModal(false);
    setTryOnData(prev => ({ ...prev, ...data }));
    setShowUploadSelfieModal(true);
  };

  const handleUploadSelfieNext = (data) => {
    setShowUploadSelfieModal(false);
    setTryOnData(prev => ({ ...prev, ...data }));
    setShowTryOnPreviewModal(true);
  };

  const handleModalClose = () => {
    setShowTryYourOutfitModal(false);
    setShowUploadSelfieModal(false);
    setShowTryOnPreviewModal(false);
    setTryOnData({});
  };

  const AddToCartModal = () => {
    if (!showAddToCartModal) return null;

    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Select Options</h3>
            <button 
              onClick={() => setShowAddToCartModal(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Size Selection - Only show if NOT a saree */}
          {!isSaree && product.selectedSizes?.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Select Size</option>
                {product.selectedSizes?.map((size, index) => (
                  <option key={index} value={size}>{size}</option>
                ))}
              </select>
            </div>
          )}

          {/* Color Selection */}
          {product.selectedColors?.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {product.selectedColors.map((colorString, index) => {
                  const { name, hex } = colorUtils.parseColor(colorString);
                  const isSelected = selectedColor === colorString;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(colorString)}
                      className={`flex items-center space-x-2 border-2 rounded-lg px-3 py-2 transition-all ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-sm capitalize">{name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (!user) {
                  toast.error("Please log in to try on!");
                  return;
                }
                setShowAddToCartModal(false);
                handleTryOnClick();
              }}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4 mr-2" />
              TRY ON
            </button>
            <button
              onClick={handleConfirmAddToCart}
              disabled={addingToCart || (!isSaree && !selectedSize)}
              className={`flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-all ${
                addingToCart || (!isSaree && !selectedSize)
                  ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                  : 'hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {addingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>

          {!isSaree && !selectedSize && (
            <p className="text-xs text-amber-600 mt-2 text-center">
              Please select a size to continue
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={onBackClick} className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsFavorite(!isFavorite)} 
                  className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
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
                      className={`aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        selectedImageIndex === index ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-gray-300'
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
                    <span className="text-3xl font-bold text-blue-600">₹{Math.round(discountedPrice)}</span>
                    <span className="text-lg text-gray-500">/Piece</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-lg text-gray-500 line-through">M.R.P ₹{Math.round(originalPrice)}</span>
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">({discountPercent}% OFF)</span>
                    </div>
                  )}

                  <p className="text-sm text-gray-600 mt-1">Tax included. Shipping calculated at checkout.</p>
                </div>
              </div>

              {product.selectedColors?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Colours Available</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.selectedColors.map((colorString, index) => {
                      const { name, hex } = colorUtils.parseColor(colorString);
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-2 border border-gray-200 rounded-full px-3 py-1"
                        >
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: hex }}
                          />
                          <span className="text-xs capitalize text-gray-700">{name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3 flex gap-5">
                <button 
                  onClick={handleAddToCart} 
                  className="w-auto bg-white text-black py-3 px-6 rounded-lg shadow-sm border font-medium flex items-center justify-center hover:shadow-md transition-all"
                >
                  <ShoppingCart className="h-5 mr-2" />
                  Add to cart
                </button>
                <button className="w-42 h-12 bg-[#1C4C74] shadow-sm text-white py-3 px-6 rounded-lg hover:bg-[#163d5d] font-medium transition-colors">
                  Buy Now
                </button>
              </div>

              <div className="space-y-3 text-sm pt-6">
                <div className="flex items-center text-gray-600">
                  <Shield className="w-4 h-4 mr-3" />
                  Secure payment
                  <div className="flex pl-12 items-center text-gray-600">
                    <Package className="w-4 h-4 mr-3" />
                    Free Size
                  </div>
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
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
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
                          <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
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
                          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
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
                <p>No similar products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddToCartModal />

      {/* Try-On Modals */}
      <TryYourOutfitModal
        isOpen={showTryYourOutfitModal}
        onClose={handleModalClose}
        onNext={handleTryYourOutfitNext}
        garmentImage={tryOnData.garmentImage}
      />

      <UploadSelfieModal
        isOpen={showUploadSelfieModal}
        onClose={handleModalClose}
        onNext={handleUploadSelfieNext}
        garmentImage={tryOnData.garmentImage}
      />

      <TryOnPreviewModal
        isOpen={showTryOnPreviewModal}
        onClose={handleModalClose}
        tryOnData={tryOnData}
      />
    </div>
  );
};

export default ProductDetailPage;