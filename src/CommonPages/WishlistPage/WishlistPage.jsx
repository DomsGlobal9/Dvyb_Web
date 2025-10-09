import React, { useState, useEffect } from 'react';
import { 
  addToWishlist, 
  removeFromWishlist, 
  getWishlist, 
  isInWishlist,
  toggleWishlist,
  subscribeToWishlist,
  clearWishlist 
} from '../../services/WishlistService';
import { addToCart } from "../../services/CartService";
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';


// Wishlist Button Component
const WishlistButton = ({ productId, productData, className = "" }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
  }, [productId]);

  const checkWishlistStatus = async () => {
    try {
      const status = await isInWishlist(productId);
      setInWishlist(status);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  const handleToggleWishlist = async () => {
    setLoading(true);
    try {
      const result = await toggleWishlist(productId, productData);
      setInWishlist(result.inWishlist);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={loading}
      className={`wishlist-btn ${inWishlist ? 'in-wishlist' : ''} ${className}`}
      style={{
        background: inWishlist ? '#ff4757' : '#ddd',
        color: inWishlist ? 'white' : '#333',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1
      }}
    >
      {loading ? '...' : inWishlist ? '❤️ Remove' : '🤍 Add to Wishlist'}
    </button>
  );
};

// Main Wishlist Page Component
const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;
    
    // Subscribe to real-time wishlist updates
    const setupSubscription = async () => {
      try {
        unsubscribe = await subscribeToWishlist((items) => {
          setWishlistItems(items);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error setting up wishlist subscription:', error);
        setLoading(false);
      }
    };

    setupSubscription();

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromWishlist(productId);
      // Real-time listener will automatically update the list
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  const handleClearWishlist = async () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        await clearWishlist();
        // Real-time listener will automatically update the list
      } catch (error) {
        console.error('Error clearing wishlist:', error);
        alert('Failed to clear wishlist. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading your wishlist...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 border-l-4 border-gray-800 pl-4">
          Wishlist
        </h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-700 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500">Start adding items you love to see them here!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {wishlistItems.map((item) => (
            <div 
              key={item.productId} 
              className="flex items-start gap-4 pb-6 border-b border-gray-200"
            >
              {/* Product Image */}
              {(item.image || item.imageUrls?.[0]) && (
                <img 
                  src={item.image || item.imageUrls[0]} 
                  alt={item.name || 'Product'} 
                  className="w-24 h-32 object-cover rounded flex-shrink-0"
                />
              )}
              
              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  {item.name || 'Product Name'}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Color :</span> {item.color || 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium">Quantity :</span> {item.quantity || '14'}
                  </p>
                  <p>
                    <span className="font-medium">Sizes :</span> {item.sizes || item.size || 'XS, S, M, L, XL, 2XL'}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className='lg:flex  lg:justify-center lg:gap-56 '>

              
              <div className=" flex text-center">
                <p className="text-lg font-semibold text-gray-900">
                  ₹{item.price ? item.price.toLocaleString('en-IN') : '0'}
                </p>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-4 lg:mt-0 flex-shrink-0">
                <button
                  onClick={async () => {
                    try {
                      await addToCart(item.productId, {
                        name: item.name,
                        price: item.price,
                        color: item.color,
                        size: item.size,
                        imageUrls: item.imageUrls || [item.image],
                        freeShipping: item.freeShipping,
                        shippingMessage: item.shippingMessage,
                      });

                      toast.success("Added to cart!");
                    } catch (error) {
                      console.error("Failed to add to cart:", error);
                      toast.error("Failed to add to cart. Please try again.");
                    }
                  }}
                  className="bg-[#1e3a5f] hover:bg-[#152a45] text-white px-6 py-2.5 rounded text-sm font-medium transition-colors"
                >
                  Add to cart
                </button>
              </div>

              {/* Delete Icon */}
              <button
                onClick={() => handleRemoveItem(item.productId)}
                className="flex-shrink-0 mt-4 lg:mt-0 text-gray-400 hover:text-red-500 transition-colors p-1"
                aria-label="Remove from wishlist"
              >
                <Trash2 size={20} />
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Example usage in a product component
const ProductCard = ({ product }) => {
  return (
    <div className="product-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>{product.name}</h3>
      <p>Color: {product.color} | Size: {product.size}</p>
      <p><strong>₹{product.price}</strong></p>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button style={{ flex: 1, padding: '10px', background: '#2ed573', color: 'white', border: 'none', borderRadius: '4px' }}>
          Add to Cart
        </button>
        <WishlistButton 
          productId={product.id}
          productData={{
            name: product.name,
            price: product.price,
            color: product.color,
            size: product.size,
            image: product.image
          }}
        />
      </div>
    </div>
  );
};

export { WishlistButton, WishlistPage, ProductCard };