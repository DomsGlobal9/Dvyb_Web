import React from 'react';
import { Package, Heart, Eye, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../../../services/WishlistService';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductCard = ({
  product,
  onProductClick,
  onToggleFavorite,
  // isFavorite 
}) => {
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      // alert('Failed to update wishlist. Please try again.');
       toast.error("Please log in to continue!");
    } finally {
      setIsLoading(false);
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
        <div className=" absolute inset-0 
  bg-black/0 group-hover:bg-black/20 
  backdrop-blur-0 group-hover:backdrop-blur-sm 
  transition-all duration-300 
  flex items-center justify-center 
  opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={handleToggleWishlist}
              disabled={isLoading}
              className={`p-2 rounded-full transition-colors ${isInWishlistState
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
              title={isInWishlistState ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isInWishlistState ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onProductClick(product);
              }}
              className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded font-medium">
            TRY ON
          </span>
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
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
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
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          >
            View
          </button>
        </div>

        {/* Colors */}
        {product.selectedColors && product.selectedColors.length > 0 && (
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500">Colors:</span>
            <div className="flex space-x-1">
              {product.selectedColors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full  border-gray-300"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
              {product.selectedColors.length > 4 && (
                <span className="text-xs text-gray-500">+{product.selectedColors.length - 4}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;