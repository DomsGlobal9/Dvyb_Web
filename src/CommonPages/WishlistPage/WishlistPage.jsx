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
      <div className="wishlist-container">
        <div className="loading">Loading your wishlist...</div>
      </div>
    );
  }

  return (
    <div className="wishlist-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div className="wishlist-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>My Wishlist ({wishlistItems.length})</h1>
        {wishlistItems.length > 0 && (
          <button 
            onClick={handleClearWishlist}
            style={{
              background: '#ff4757',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>Your wishlist is empty</h3>
          <p>Start adding items you love to see them here!</p>
        </div>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item) => (
            <div 
              key={item.productId} 
              className="wishlist-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '15px',
                backgroundColor: 'white'
              }}
            >
              {/* Product Image */}
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.name || 'Product'} 
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginRight: '15px'
                  }}
                />
              )}
              
              {/* Product Details */}
              <div className="item-details" style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{item.name || 'Product Name'}</h3>
                <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                  Color: {item.color || 'N/A'} | Size: {item.size || 'N/A'}
                </p>
                <p style={{ margin: '0', fontWeight: 'bold', fontSize: '18px' }}>
                  ₹{item.price || '0'}
                </p>
                <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#888' }}>
                  Added on: {item.addedAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="item-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  style={{
                    background: '#ff4757',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
                <button
                  style={{
                    background: '#2ed573',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add to Cart
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