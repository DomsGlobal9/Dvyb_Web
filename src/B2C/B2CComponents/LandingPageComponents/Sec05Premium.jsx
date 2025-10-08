import React, { useState, useEffect } from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { productService } from "../../../services/firebaseServices";
import { addToCart } from "../../../services/CartService";
import { toggleWishlist, isInWishlist } from "../../../services/WishlistService";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PremiumSection05() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [addingToCart, setAddingToCart] = useState(new Set());
  const [togglingWishlist, setTogglingWishlist] = useState(new Set());
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const { user } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) { // mobile < md
      setDisplayedProducts(products.slice(0, 4));
    } else {
      setDisplayedProducts(products);
    }
  };

  handleResize(); // run on mount
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, [products]);
  // Fetch products on component mount
  useEffect(() => {
    const fetchPremiumProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await productService.fetchAllProducts();
        setProducts(fetchedProducts.slice(0, 8)); // Limit to last 6 products
        console.log("Fetched products:", fetchedProducts);
      } catch (err) {
        setError("Failed to load premium products. Please try again later.");
        console.error("Error fetching premium products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumProducts();
  }, []);

  // Check wishlist status for all products when user is authenticated
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!user || products.length === 0) return;

      try {
        const wishlistChecks = await Promise.all(
          products.map(product => isInWishlist(product.id))
        );
        
        const wishlistSet = new Set();
        products.forEach((product, index) => {
          if (wishlistChecks[index]) {
            wishlistSet.add(product.id);
          }
        });
        
        setWishlistItems(wishlistSet);
      } catch (error) {
        console.error("Error checking wishlist status:", error);
      }
    };

    checkWishlistStatus();
  }, [user, products]);

  // Handle adding product to cart
  const handleAddToCart = async (product, event) => {
    event.stopPropagation(); // Prevent product click navigation
    
    if (!user) {
      toast.error("Please log in to add items to cart!");
      return;
    }

    if (addingToCart.has(product.id)) return; // Prevent double clicks

    try {
      setAddingToCart(prev => new Set([...prev, product.id]));

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
      setAddingToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async (product, event) => {
    event.stopPropagation(); // Prevent product click navigation
    
    if (!user) {
      toast.error("Please log in to manage your wishlist!");
      return;
    }

    if (togglingWishlist.has(product.id)) return; // Prevent double clicks

    try {
      setTogglingWishlist(prev => new Set([...prev, product.id]));

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

      const result = await toggleWishlist(product.id, productData);
      
      // Update local wishlist state
      setWishlistItems(prev => {
        const newSet = new Set(prev);
        if (result.inWishlist) {
          newSet.add(product.id);
          toast.success(`${productData.name} added to wishlist!`);
        } else {
          newSet.delete(product.id);
          toast.success(`${productData.name} removed from wishlist!`);
        }
        return newSet;
      });

    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error("Failed to update wishlist. Please try again.");
    } finally {
      setTogglingWishlist(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  // Handle product click navigation - navigate to separate product detail page
  const handleProductClick = (product) => {
    // Navigate to product detail page using your existing route pattern
    navigate(`/products/${product.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading premium products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white lg:py-12 py-8 px-4 "
      style={{ fontFamily: "Outfit" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block border-gray-200 border px-4 p-1 mb-6">
            <span className="text-xs font-medium text-gray-600 tracking-wider">
             DVYB COLLECTION
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PREMIUM SELECTIONS
          </h1>
          <p className="text-gray-600 mb-6">
            Indulge in our curated luxury collection, where fashion meets
            culture.
          </p>
          <div className="flex items-center justify-center text-sm text-gray-600">
            {/* <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
            <span className="font-medium">
              32,817 PRECISION FITTINGS COMPLETED TODAY
            </span> */}
          </div>
        </div>

        {/* Product Grid */}
     <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-4  gap-2 lg:gap-24 justify-items-center">
  {products.length === 0 ? (
    <p className="text-gray-600 text-center col-span-full">
      No premium products available at the moment.
    </p>
  ) : (
    displayedProducts.map((product) => (

      <div
        key={product.id}
        className="bg-white rounded-lg shadow-sm border  border-gray-200 overflow-hidden hover:shadow-md transition-shadow w-full max-w-[320px] md:max-w-[340px] lg:max-w-[360px] xl:w-80 cursor-pointer"
        onClick={() => handleProductClick(product)}
      >
        {/* Product Image */}
        <div className="relative aspect-[4/5]  overflow-hidden">
          <img
            src={
              product.imageUrls && product.imageUrls.length > 0
                ? product.imageUrls[0]
                : "https://via.placeholder.com/400"
            }
            alt={product.name || product.title}
            className="w-full h-full object-cover"
          />
          
          {/* Discount Badge */}
          {product.discount && product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-md font-medium">
              -{product.discount}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Rating and Fit Accuracy */}
          <div className="flex items-center mb-2 justify-between space-x-2">
            {/* Rating */}
            <div className="flex items-center">
              <div className="flex items-center space-x-0.5 mr-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < 4
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-700 font-medium">
                (4.0)
              </span>
            </div>

            {/* Accuracy */}
            <div>
              <span className="text-xs text-gray-500 font-medium text-end">
                95% FIT ACCURACY
              </span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">
            {product.name || product.title}
          </h3>

          {/* Pricing */}
          <div className="mb-1">
            <span className="font-bold text-gray-900 text-base mr-2">
              ₹{product.price}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ₹{parseFloat(product.price) + 100}
            </span>
          </div>

          {/* Savings */}
          <div className="mb-3">
            <span className="text-xs text-green-600 font-medium">
              Save ₹100
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center  justify-center space-x-2">
            {/* Add to Cart Button */}
            <button 
              className={`flex-1 bg-[#3C8E9A] hover:bg-teal-700 text-white text-xs font-medium py-2 px-3 rounded flex items-center justify-center space-x-1 transition-colors ${
                addingToCart.has(product.id) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={(e) => handleAddToCart(product, e)}
              disabled={addingToCart.has(product.id)}
            >
              <ShoppingCart className="w-4  me-2 h-4 md:w-5  md:h-5" />
              <p className="text-[8px] md:text-xs" >
                {addingToCart.has(product.id) ? (
                  <>ADDING...</>
                ) : (
                  < >ADD TO <br />COLLECTION</>
                )}
              </p>
            </button>

            {/* Wishlist Button */}
            <button 
              className={`p-1 border border-gray-200 rounded hover:bg-gray-50 transition-colors ${
                togglingWishlist.has(product.id) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={(e) => handleWishlistToggle(product, e)}
              disabled={togglingWishlist.has(product.id)}
            >
              <Heart 
                className={`w-3 h-3 md:h-5 md:w-5 m-2 transition-colors ${
                  wishlistItems.has(product.id) 
                    ? 'text-red-500 fill-current' 
                    : 'text-gray-600'
                }`} 
              />
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>
      </div>
    </div>
  );
}

export default PremiumSection05;