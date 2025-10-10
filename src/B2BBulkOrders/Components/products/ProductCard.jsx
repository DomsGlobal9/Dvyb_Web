import React, { useState, useEffect } from 'react';
import { Package, Heart, Star } from 'lucide-react';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../../../services/WishlistService';
import { addToCart } from '../../../services/CartService';
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bag_ic from '../../../assets/B2cAssets/LandingPageImges/Bag_ic.svg';

const ProductCard = ({
  product,
  onProductClick,
  onToggleFavorite,
}) => {
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const { user } = useAuth();

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

  const handleToggleWishlist = async (e) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      if (isInWishlistState) {
        await removeFromWishlist(product.id);
        setIsInWishlistState(false);
        if (onToggleFavorite) {
          onToggleFavorite(product.id, false);
        }
      } else {
        const productData = {
          name: product.title || product.name || 'Untitled Product',
          price: product.price || 0,
          image: product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : null,
          ...(product.fabric && { fabric: product.fabric }),
          ...(product.craft && { craft: product.craft }),
          ...(product.rating && { rating: product.rating }),
          ...(product.discount && { discount: product.discount }),
          ...(product.selectedColors && { selectedColors: product.selectedColors })
        };

        await addToWishlist(product.id, productData);
        setIsInWishlistState(true);
        if (onToggleFavorite) {
          onToggleFavorite(product.id, true);
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error("Please log in to continue!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (event) => {
    event.stopPropagation(); // Prevent product click navigation
    
    if (!user) {
      toast.error("Please log in to add items to cart!");
      return;
    }

    if (addingToCart) return; // Prevent double clicks

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
      toast.success(`${productData.name} added to cart!`);
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => onProductClick(product)}
    >
      {/* Product Image */}
      <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
        {product.imageUrls && product.imageUrls.length > 0 ? (
          <img
            src={product.imageUrls[0]}
            alt={product.title || product.name || 'Product'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 
          bg-black/0 group-hover:bg-black/20 
          backdrop-blur-0 group-hover:backdrop-blur-sm 
          transition-all duration-300 
          flex items-center justify-center 
          opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={handleToggleWishlist}
              disabled={isLoading}
              className={`p-2 rounded-full transition-colors ${
                isInWishlistState
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
              title={isInWishlistState ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isInWishlistState ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`p-2 text-gray-700 bg-white rounded-full transition-colors ${
                addingToCart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:scale-110'
              }`}
              title="Add to cart"
            >
              <img src={Bag_ic} alt="bag" className="w-4 h-4 invert" />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {product.discount && product.discount > 0 && (
            <span className="block px-2 py-1 bg-red-500 text-white text-xs rounded font-medium">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
          {product.title || product.name || 'Untitled Product'}
        </h3>

        {/* Product Details */}
        <div className="text-xs text-gray-500 mb-2 space-y-1">
          {product.fabric && (
            <div>Fabric: {product.fabric}</div>
          )}
          {product.craft && (
            <div>Craft: {product.craft}</div>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-2">
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

        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price || '0'}
            </span>
            {product.discount && product.discount > 0 && (
              <div className="text-xs text-green-600">
                {product.discount}% off
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product);
            }}
            className="text-xs border border-2 border-[#1C4C74] text-[#1C4C74] px-4 py-2 rounded hover:bg-[#1C4C74] hover:text-white transition-colors"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;