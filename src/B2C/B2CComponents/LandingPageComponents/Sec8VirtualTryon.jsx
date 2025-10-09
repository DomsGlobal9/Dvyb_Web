import React, { useState, useEffect } from "react";
import { Star, ArrowRight, Heart } from "lucide-react";
import saree from "../../../assets/B2cAssets/LandingPageImges/sareepink.png";
import Bag from "../../../assets/B2cAssets/LandingPageImges/Bag_ic.svg";
import { useNavigate } from "react-router-dom";

import { productService } from "../../../services/firebaseServices";
import { addToCart } from "../../../services/CartService";
import { toggleWishlist, isInWishlist } from "../../../services/WishlistService";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// StatsCard unchanged
const   StatsCard = ({ value, label, sublabel }) => (
  <div className="p-4 text-center">
    <div className="text-xs text-gray-400">{sublabel}</div>
    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
      {value}
    </div>
    <div className="text-xs text-gray-300 font-medium">{label}</div>
  </div>
);

// ProductCard: unchanged UI, added onClick on root and Heart icon for coloring
const ProductCard = ({
  product,
  isWishlisted,
  addingToCart,
  togglingWishlist,
  handleAddToCart,
  handleWishlistToggle,
  handleProductClick, // NEW: click handler
}) => {
  const currentPrice = parseFloat(product.price) || 0;
  const originalPrice = (currentPrice * 1.3).toFixed(0);
  const savePercent = "SAVE 30%";

  return (
    <div
      className="bg-black border border-gray-700 p-0 w-[320px] lg:w-[350px] flex-shrink-0"
      onClick={() => handleProductClick(product)} // navigate when card clicked
    >
      <div className="relative mb-4">
        <img
          src={
            product.imageUrls && product.imageUrls.length > 0
              ? product.imageUrls[0]
              : saree
          }
          alt={product.name || product.title}
          className="w-full h-80 lg:h-96 object-cover bg-gray-200"
        />
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < 4 ? "fill-white text-white" : "text-gray-600"}
                />
              ))}
            </div>
            <span className="text-gray-400 text-xs ml-2">(4.0)</span>
          </div>
          {/* <span className="text-gray-400 text-xs">1967 FITTED</span> */}
        </div>

        <h3 className="text-white  text-sm font-medium mt-4 uppercase tracking-wide">
          {product.name || product.title}
        </h3>

        <div className="flex items-center mt-1  gap-3 mb-2">
          <span className="text-white font-outfit text-xl">₹{currentPrice}</span>
          <span className="text-gray-500 line-through font-outfit text-xl">
            ₹{originalPrice}
          </span>
        </div>

        <div className="text-[#DA4218] text-[16px] font-outfit mb-2">{savePercent}</div>

        <div className=" ">
          <div className="flex justify-between text-md mb-2">
            <span className="text-[#3C8E9A]">TRY ON SCORE</span>
            <span className="py-1 font-medium">+38%</span>
          </div>

          <div className="w-full bg-gray-800 h-1 mb-4">
            <div className="bg-teal-500 h-1" style={{ width: "80%" }}></div>
          </div>

          <div className="flex items-center justify-center gap-3">
            {/* Add to Bag */}
            <button
              className={`flex items-center justify-center w-3/4 gap-2 bg-[#3C8E9A] text-white px-6 py-2 ${
                addingToCart ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={(e) => handleAddToCart(product, e)}
              disabled={addingToCart}
            >
              <img src={Bag} className="h-3 lg:h-4" alt="bag" />
              <span className="text-sm tracking-wide">
                {addingToCart ? "ADDING..." : "ADD TO BAG"}
              </span>
            </button>

            {/* Wishlist - replaced image with Lucide Heart so we can color it */}
            <button
              className={`flex items-center justify-center border border-gray-500 px-3 py-2  ${
                togglingWishlist ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={(e) => handleWishlistToggle(product, e)}
              disabled={togglingWishlist}
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? "text-red-500" : "text-gray-400"}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function VirtualTryonSection8() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [addingToCart, setAddingToCart] = useState(new Set());
  const [togglingWishlist, setTogglingWishlist] = useState(new Set());
  const { user } = useAuth();
  const navigate = useNavigate(); // NEW

  // NEW: navigate to product details
  const handleProductClick = (product) => {
    // if your product id is _id or slug, change product.id to product._id or product.slug
    navigate(`/products/${product.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await productService.fetchAllProducts();
        setProducts(fetchedProducts.slice(0, 8));
      } catch (err) {
        toast.error("Failed to load products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Check wishlist status
  useEffect(() => {
    const checkWishlist = async () => {
      if (!user || products.length === 0) return;
      const results = await Promise.all(products.map((p) => isInWishlist(p.id)));
      const newSet = new Set();
      products.forEach((p, i) => results[i] && newSet.add(p.id));
      setWishlistItems(newSet);
    };
    checkWishlist();
  }, [user, products]);

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    if (!user) return toast.error("Please log in to add items to cart!");
    if (addingToCart.has(product.id)) return;

    try {
      setAddingToCart((prev) => new Set(prev).add(product.id));
      const data = {
        name: product.name || product.title,
        price: parseFloat(product.price) || 0,
        imageUrls: product.imageUrls || [],
      };
      await addToCart(product.id, data, 1);
      toast.success(`${data.name} added to cart!`);
    } catch {
      toast.error("Failed to add item to cart.");
    } finally {
      setAddingToCart((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const handleWishlistToggle = async (product, e) => {
    e.stopPropagation();
    if (!user) return toast.error("Please log in to manage wishlist!");
    if (togglingWishlist.has(product.id)) return;

    try {
      setTogglingWishlist((prev) => new Set(prev).add(product.id));
      const data = {
        name: product.name || product.title,
        price: parseFloat(product.price) || 0,
        imageUrls: product.imageUrls || [],
      };
      const result = await toggleWishlist(product.id, data);
      setWishlistItems((prev) => {
        const newSet = new Set(prev);
        result.inWishlist ? newSet.add(product.id) : newSet.delete(product.id);
        toast.success(
          `${data.name} ${result.inWishlist ? "added to" : "removed from"} wishlist!`
        );
        return newSet;
      });
    } catch {
      toast.error("Failed to update wishlist.");
    } finally {
      setTogglingWishlist((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Loading products...</p>
      </div>
    );

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "Outfit" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <button className="p-2 border border-gray-700 text-gray-400 bg-[#0A0E14] tracking-wider text-sm md:text-base">
            TRENDING
          </button>
        </div>

        <div className="text-start mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-5xl font-bold mb-6 leading-tight">
            TRENDING IN VIRTUAL TRY-ON
          </h1>
          <p className="text-gray-400  font-outfit text-sm   md:text-base max-w-2xl leading-relaxed">
            This week, the outfits that have been tried on the most by our users are truly remarkable! From stylish dresses to trendy casual wear, everyone seems to be exploring new looks.
          </p>
        </div>

        {/* Product scroll */}
        <div className="mb-8 md:mb-12">
          <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistItems.has(product.id)}
                addingToCart={addingToCart.has(product.id)}
                togglingWishlist={togglingWishlist.has(product.id)}
                handleAddToCart={handleAddToCart}
                handleWishlistToggle={handleWishlistToggle}
                handleProductClick={handleProductClick} // pass navigation handler
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-8 md:mb-12 border-[2px] border-[#212833]">
          <StatsCard value="1200" label="DAILY VIRTUAL FITTINGS" sublabel="Active" />
          <StatsCard value="1k" label="TRENDING ITEMS" sublabel="Live" />
          <StatsCard value="99.4%" label="PRECISION RATE" sublabel="Accuracy" />
          <StatsCard value="2000+" label="GLOBAL USERS" sublabel="Online" />
        </div>

        <div className="text-center space-y-6">
          <button onClick={()=>navigate('/products')} className="bg-[#3C8E9A] hover:bg-teal-600 text-white font-medium px-8 py-4 transition-colors duration-200 flex items-center gap-2 mx-auto">
            EXPLORE TRENDING COLLECTION
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default VirtualTryonSection8;
