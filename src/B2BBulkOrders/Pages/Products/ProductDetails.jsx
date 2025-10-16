import React, { useState, useMemo, useEffect } from 'react';
import { Package, ArrowLeft, ShoppingCart, Star, Heart, X, Eye } from 'lucide-react';
import TryYourOutfitModal from './Models/TryYourOutfitModal';
import UploadSelfieModal from './Models/UploadSelfieModal';
import TryOnPreviewModal from './Models/TryOnPreviewModal';
import { useAuth } from '../../../context/AuthContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isInWishlist, toggleWishlist } from "../../../services/WishlistService";
import { colorUtils } from '../../../utils/colorUtils';
import { addToCart } from '../../../services/CartService';
import Navbar from '../../../common/Navbar/b2cNavbar';
import Secure_ic from '../../../assets/ProductsPage/Secure_ic.svg'
import Shipping_ic from '../../../assets/ProductsPage/Shipping_ic.svg'
import Breadcrumbs from '../../../common/components/Breadcrumbs';
import { getProductBreadcrumbs } from '../../../utils/breadcrumbUtil';
import { useSearchParams } from 'react-router-dom';
import { usePopup } from '../../../context/ToastPopupContext';
import ProductCard from '../../Components/products/ProductCard';

const ProductDetailPage = ({ product, onBackClick, allProducts = [], onProductClick }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();
// const { category, subcategory, productName } = getProductBreadcrumbs(product);


//Bread crumbs
const [searchParams] = useSearchParams();
  const navCategory = searchParams.get('category'); // Get from URL
  
   const { category, section, subcategory, productName } = getProductBreadcrumbs(
    product,
    navCategory ? navCategory.toUpperCase() : null
  );

  // Modal states
  const [showTryYourOutfitModal, setShowTryYourOutfitModal] = useState(false);
  const [showUploadSelfieModal, setShowUploadSelfieModal] = useState(false);
  const [showTryOnPreviewModal, setShowTryOnPreviewModal] = useState(false);
  const [tryOnData, setTryOnData] = useState({});
  const { showPopup } = usePopup();
  

  // Set default color when component loads
  useEffect(() => {
    if (product?.selectedColors?.length > 0 && !selectedColor) {
      setSelectedColor(product.selectedColors[0]);
    }
  }, [product, selectedColor]);

  // Handle modal overflow
  useEffect(() => {
    const isAnyModalOpen = showTryYourOutfitModal || showUploadSelfieModal || showTryOnPreviewModal || showAddToCartModal;
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

  // Get similar products based on color matching
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

  // Load wishlist with debouncing
  useEffect(() => {
    if (!user) return;
    
    const timeoutId = setTimeout(() => {
      const loadWishlistForSimilarProducts = async () => {
        try {
          const productIds = [product.id, ...similarProducts.map(p => p.id)];
          const wishlistStatuses = await Promise.all(productIds.map(id => isInWishlist(id)));
          const wishlistedIds = productIds.filter((id, index) => wishlistStatuses[index]);
          setWishlist(wishlistedIds);
        } catch (error) {
          console.error("Failed to load wishlist:", error);
        }
      };
      loadWishlistForSimilarProducts();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [user, product.id, similarProducts]);

  const isSaree = (product.title || product.name || '').toLowerCase().includes('saree') ||
    (product.fabric || '').toLowerCase().includes('saree') ||
    (product.craft || '').toLowerCase().includes('saree');

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to cart!");
      return;
    }
    setShowAddToCartModal(true);
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please log in to add items to cart!");
      return;
    }
    alert("on the way")
  };

  const handleConfirmAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to continue!");
      return;
    }
    if (!isSaree && !selectedSize) {
      toast.warning("Please select a size first!");
      return;
    }
    if (addingToCart) return;

    try {
      setAddingToCart(true);
      const productData = {
        name: product.name || product.title,
        title: product.title || product.name,
        price: parseFloat(product.price) || 0,
        size: isSaree ? 'Free Size' : selectedSize,
        color: selectedColor || (product.selectedColors?.[0] || ''),
        image: product.imageUrls?.[0] || '',
        imageUrls: product.imageUrls || [],
        selectedColors: product.selectedColors || [],
        selectedSizes: product.selectedSizes || [],
        fabric: product.fabric || '',
        craft: product.craft || '',
        description: product.description || '',
        subtotal: parseFloat(product.price) || 0,
        freeShipping: parseFloat(product.price) > 500,
        shippingMessage: parseFloat(product.price) > 500
          ? null
          : 'Add ₹' + (500 - parseFloat(product.price)) + ' more for free shipping',
        discount: product.discount || 0,
        originalPrice: originalPrice
      };

      await addToCart(product.id, productData, 1);
       showPopup("cart", {
      title: productData.name,
      image: productData.image,
    });
      // const sizeDisplay = isSaree ? '' : ` (${selectedSize})`;
      // toast.success(`${productData.name}${sizeDisplay} (${selectedColor}) added to cart!`);
      setShowAddToCartModal(false);
      setSelectedSize('');
    } catch (error) {
      console.error("Error adding to cart:", error);
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

  // Optimistic wishlist toggle
const handleToggleWishlist = async (item) => {
  if (!user) {
    toast.error("Please log in to manage your wishlist!");
    return;
  }
  
  const isCurrentlyInWishlist = wishlist.includes(item.id);
  setWishlist((prev) =>
    isCurrentlyInWishlist
      ? prev.filter((id) => id !== item.id)
      : [...prev, item.id]
  );
  
  try {
    await toggleWishlist(item.id, item);
    
    // 🎉 ADD POPUP HERE
    if (isCurrentlyInWishlist) {
      showPopup("wishlistRemove", {
        title: item.title || item.name,
        image: item.imageUrls?.[0],
      });
    } else {
      showPopup("wishlist", {
        title: item.title || item.name,
        image: item.imageUrls?.[0],
      });
    }
  } catch (err) {
    setWishlist((prev) =>
      isCurrentlyInWishlist
        ? [...prev, item.id]
        : prev.filter((id) => id !== item.id)
    );
    console.error(err);
    toast.error("Error updating wishlist!");
  }
};


  const handleAddToCartFromSimilar = async (item) => {
    if (!user) {
      toast.error("Please log in to add to cart!");
      return;
    }
    try {
      const productData = {
        name: item.name || item.title,
        title: item.title || item.name,
        price: parseFloat(item.price) || 0,
        size: 'Free Size',
        color: item.selectedColors?.[0] || '',
        image: item.imageUrls?.[0] || '',
        imageUrls: item.imageUrls || [],
        selectedColors: item.selectedColors || [],
        selectedSizes: item.selectedSizes || [],
        fabric: item.fabric || '',
        craft: item.craft || '',
        description: item.description || '',
        subtotal: parseFloat(item.price) || 0,
        freeShipping: parseFloat(item.price) > 500,
        discount: item.discount || 0
      };
      await addToCart(item.id, productData, 1);
      // toast.success(`${item.title || item.name} added to cart!`);
          showPopup("cart", {
      title: item.title || item.name,
      image: item.imageUrls?.[0],
    }); 
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  const AddToCartModal = () => {
    if (!showAddToCartModal) return null;

    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Select Options</h3>
            <button onClick={() => setShowAddToCartModal(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

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

          {product.selectedColors?.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {product.selectedColors.map((colorString, index) => {
                  const { name, hex } = colorUtils.parseColor(colorString);
                  const isSelected = selectedColor === colorString;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(colorString)}
                      className={`flex items-center space-x-2 border-2 rounded-lg px-3 py-2 transition-all ${
                        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full border border-gray-300" style={{ backgroundColor: hex }} />
                      <span className="text-sm capitalize">{name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
              className={`flex-1 border-2 border-gray-300 cursor-pointer text-gray-700 py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-all ${
                addingToCart || (!isSaree && !selectedSize)
                  ? 'opacity-50 cursor-not-allowed bg-gray-50'
                  : 'hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <ShoppingCart className="w-4 cursor-pointer h-4 mr-2" />
              {addingToCart ? 'Adding...' : 'Add to Bag'}
            </button>
          </div>

          {!isSaree && !selectedSize && (
            <p className="text-xs text-amber-600 mt-2 text-center">Please select a size to continue</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={onBackClick} className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </button>
 <Breadcrumbs
  category={category}
   section={section}   
  subcategory={subcategory}
  productName={productName}
  />

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleWishlist(product);
                  }}
                  className={`absolute top-3 left-3 z-10 p-2 rounded-full transition-all hover:scale-110 shadow-md ${
                    wishlist.includes(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  title={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 transition-colors ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                </button>

                {product.imageUrls?.length > 0 ? (
                  <img
                    src={product.imageUrls[selectedImageIndex] || product.imageUrls[0]}
                    alt={product.title || product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
      console.error('Image failed to load:', e.currentTarget.src);
      e.currentTarget.src = '/placeholder-image.jpg'; // Add placeholder
    }}
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
                    <span className="text-3xl font-bold text-[#0A95D4]">₹{Math.round(discountedPrice)}</span>
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
                        <div key={index} className="flex items-center space-x-2 border border-gray-200 rounded-full px-3 py-1">
                          <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: hex }} />
                          <span className="text-xs capitalize text-gray-700">{name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3 flex gap-5">
                <button onClick={handleAddToCart} className="w-auto cursor-pointer bg-white text-black py-3 px-6 rounded-lg shadow-sm border font-medium flex items-center justify-center hover:shadow-md transition-all">
                  <ShoppingCart className="md:h-5 h-4 mr-2" />
              <span className='text-sm'>  Add to Bag </span>  
                </button>
                <button onClick={handleBuyNow} className="w-42 h-12 text-sm cursor-pointer bg-[#1C4C74] shadow-sm text-white py-3 px-6 rounded-lg hover:bg-[#163d5d] font-medium transition-colors">
                  Buy Now
                </button>
              </div>

              <div className="space-y-3 border md:w-2/3 border-gray-600 rounded-md text-sm p-7 pt-6">
                <div className="flex items-center     text-[#3C4242] font-semibold font-poppins ">
                  <img src={Secure_ic} className="w-auto  h-8 mr-3" alt="Secure" />
                  Secure payment
                  <div className="flex pl-12 items-center text-gray-600">
                    <Package className="w-4 h-4 mr-3" />
                    Free Size
                  </div>
                </div>
                <div className="flex  text-[#3C4242] font-semibold items-center pt-5 ">
                  <img src={Shipping_ic} className="w-auto h-8 mr-3" alt="Shipping" />
                  Free Shipping & Returns
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="p-6">
            <div className='flex gap-[8px]'>
              <div className='h-[28px] w-1.5 rounded-full bg-[#1C4C74]'></div>
              <h3 className="text-2xl -mt-1 text-[#3C4242] font-semibold mb-4">Product Description</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Description</h4>
                <div className='w-[93px] bg-black h-[1.5px] rounded-4xl'></div>
                <p className="text-gray-600 mt-[16px] text-sm mb-4">{product.description}</p>
                <p className="text-gray-600 text-sm">Crafted with intricate embroidery. Perfect for any occasion. Comfortable fit and vibrant colors.</p>

                <div className="mt-4 grid bg-[#F2F9FF] h-26 items-center p-7 grid-cols-3 text-sm divide-x divide-gray-300 rounded-xl">
                  <div className="px-4">
                    <div className="font-medium text-[#807D7E] mb-1">Fabric:</div>
                    <div className="text-gray-900">{product.fabric || 'Premium'}</div>
                  </div>
                  <div className="px-4 md:px-14">
                    <div className="font-medium text-[#807D7E] mb-1">Pattern:</div>
                    <div className="text-gray-900">{product.craft || 'Printed'}</div>
                  </div>
                  <div className="px-4 md:px-14">
                    <div className="font-medium text-[#807D7E] mb-1">Fit:</div>
                    <div className="text-gray-900">Regular</div>
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
  <h3 className="text-lg font-bold mb-6">Similar Products</h3>

  {similarProducts.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 gap-4">
      {similarProducts.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          onProductClick={(product) => {
            if (onProductClick) {
              onProductClick(product);
              window.scrollTo(0, 0);
            }
          }}
          onToggleFavorite={(productId, isAdded) => {
            // Update local wishlist state
            setWishlist((prev) =>
              isAdded
                ? [...prev, productId]
                : prev.filter((id) => id !== productId)
            );
          }}
        />
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
         isSaree={isSaree}  
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