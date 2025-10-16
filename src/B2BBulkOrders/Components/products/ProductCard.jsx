import React, { useState, useEffect } from 'react';
import { Package, Heart, Star } from 'lucide-react';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../../../services/WishlistService';
import { addToCart } from '../../../services/CartService';
import { useAuth } from "../../../context/AuthContext";

import Bag_ic from '../../../assets/B2cAssets/LandingPageImges/Bag_ic.svg';
import ion_cart from '../../../assets/ProductsPage/ion_cart-outline.svg'
import ion_heart from '../../../assets/ProductsPage/iconamoon_heart-light.svg'
import { usePopup } from "../../../context/ToastPopupContext";


const ProductCard = ({ product, onProductClick, onToggleFavorite }) => {
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const { user } = useAuth();
const { showPopup } = usePopup();

  useEffect(() => {
    checkWishlistStatus();
  }, [product.id]);

  const checkWishlistStatus = async () => {
    try {
      const inWishlist = await isInWishlist(product.id);
      setIsInWishlistState(inWishlist);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  // Optimistic wishlist toggle
  const handleToggleWishlist = async (e) => {
    e.stopPropagation();
    
    if (!user) {
      toast.error("Please log in to continue!");
      return;
    }

    // Optimistic update - change UI immediately
    const wasInWishlist = isInWishlistState;
    setIsInWishlistState(!wasInWishlist);
    setIsLoading(true);

    try {
      if (wasInWishlist) {
        await removeFromWishlist(product.id);
        if (onToggleFavorite) {
          onToggleFavorite(product.id, false);
            showPopup("wishlistRemove", {
    title: product.name || product.title,
    image: product.imageUrls?.[0],
  });
        }
      } else {
        const productData = {
          name: product.title || product.name || 'Untitled Product',
          price: product.price || 0,
          image: product.imageUrls?.[0] || null,
          ...(product.fabric && { fabric: product.fabric }),
          ...(product.craft && { craft: product.craft }),
          ...(product.rating && { rating: product.rating }),
          ...(product.discount && { discount: product.discount }),
          ...(product.selectedColors && { selectedColors: product.selectedColors })
        };

        await addToWishlist(product.id, productData);
        if (onToggleFavorite) {
          onToggleFavorite(product.id, true);
        }
        showPopup("wishlist", {
  title: productData.name,
  image: productData.image,
});

      }
    } catch (error) {
      // Revert on error
      setIsInWishlistState(wasInWishlist);
      console.error('Error toggling wishlist:', error);
      toast.error("Failed to update wishlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    
    if (!user) {
      toast.error("Please log in to add items to cart!");
      return;
    }

    if (addingToCart) return;

    try {
      setAddingToCart(true);

      const productData = {
        name: product.name || product.title,
        title: product.title || product.name,
        price: parseFloat(product.price) || 0,
        imageUrls: product.imageUrls || [],
        selectedColors: product.selectedColors || [],
        selectedSizes: product.selectedSizes || [],
        fabric: product.fabric || '',
        craft: product.craft || '',
        description: product.description || ''
      };

      await addToCart(product.id, productData, 1);
      // toast.success(`${productData.name} added to cart!`);
      showPopup("cart", {
  title: productData.name || productData.title,
  image: productData.imageUrls?.[0],
});
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div
      className="bg-white rounded-lg w-auto overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => onProductClick(product)}
    >
      {/* Product Image */}
      <div className="aspect-[3/4] bg-gray-100   relative overflow-hidden">
        {product.imageUrls?.length > 0 ? (
          <img
            src={product.imageUrls[0]}
            alt={product.title || product.name || 'Product'}
            className=" h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
        )}
        {/* 🟢 Top-Right Icons for Mobile */}
       <div className='absolute top-2 left-2 flex flex-col space-y-2 sm:hidden'>
  {/* ❤️ Wishlist Icon */}
  <button
    onClick={(e) => {
      e.stopPropagation(); // ⛔ prevent parent click
      handleToggleWishlist(e);
    }}
    disabled={isLoading}
    className={`p-1.5 rounded-full cursor-pointer shadow-md `}
  >
     <Heart 
     onClick={(e)=> e.stopPropagation() }
        className={`w-4 h-4 transition-colors ${
          isInWishlistState ? 'text-red-500 fill-current' : 'text-gray-600'
        }`} />
    {/* <img
      src={ion_heart}
      className={`w-4 h-4 cursor-pointer ${isInWishlistState ? 'fill-current' : ''}`}
      alt="wishlist"
    /> */}
  </button>
</div>

<div className="absolute top-2 right-2 flex flex-col space-y-2 sm:hidden">
  {/* 🛒 Add to Cart Icon */}
  <button
    onClick={(e) => {
      e.stopPropagation(); // ⛔ prevent parent click
      handleAddToCart(e);
    }}
    disabled={addingToCart}
    className={`p-1.5 rounded-full shadow-md text-gray-700 ${
      addingToCart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
    }`}
  >
    <img src={ion_cart} alt="cart" className="w-4 h-4" />
  </button>
</div>



        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={handleToggleWishlist}
              disabled={isLoading}
              className={`p-2 rounded-full cursor-pointer transition-all ${
                isInWishlistState
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
              title={isInWishlistState ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4 cursor-pointer h-4 ${isInWishlistState ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`p-2 text-gray-700 bg-white rounded-full transition-all ${
                addingToCart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:scale-110'
              }`}
              title="Add to cart"
            >
              <img src={Bag_ic} alt="bag" className="w-4 h-4 invert" />
            </button>
          </div>
        </div>

        {/* Badges */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3">
            <span className="block px-2 py-1 bg-red-500 text-white text-xs rounded font-medium">
              {product.discount}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        <div className="flex flex-col sm:flex-row sm:gap-[24px] sm:justify-center sm:items-center">
          <div className="w-full  sm:text-left sm:w-[75px] md:w-[112px] lg:w-[174px]">
            <h3 className="font-semibold text-gray-900 text-[12px] md:text-[16px] mb-1 truncate">
              {product.title || product.name || 'Untitled Product'}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center justify-center sm:justify-start mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
              </div>
            )}

            <div className="line-clamp-1 md:text-[14px] text-[12px] font-popins">
              {product.description}
            </div>

            {/* Price */}
            <div className="flex flex-col  mt-1.5 md:mt-1 mb-1.5 md:mb-3 ">
              <span className="text-[16px] md:text-[16px] font-semibold text-[#1C6BAD]">
                ₹{product.price || '0'}
              </span>
              {product.discount > 0 && (
                <div className="text-xs text-green-600">
                  {product.discount}% off
                </div>
              )}
            </div>
          </div>
          
          {/* View Button */}
          <div className="flex md:-mt-5 sm:justify-start">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onProductClick(product);
              }}
              className="md:text-[16px]  text-[13px] w-full md:w-[79px] border font-outfit font-semibold border-[#1C4C74] bg-[#1C4C74] px-4 py-2 rounded hover:bg-[#1C4C74] text-white transition-colors"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;