import React, { useState, useEffect, useRef } from "react";
import {
  FaHeart,
  FaShoppingBag,
  FaUser,
  FaSearch,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { womenCategories } from "./navCatData";
import b2clogo from "../../assets/Navbar/B2cLogo.png";
import fav from "../../assets/B2Bassets/NavbarImages/heart.png";
import cart from "../../assets/B2Bassets/NavbarImages/cart.png";
import profile from "../../assets/B2Bassets/NavbarImages/profile.png";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { subscribeToCart } from "../../services/CartService"; // Import cart service

const Navbar = () => {
  const [showWomenCategories, setShowWomenCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  // Wishlist
  const { wishlist } = useWishlist();

  // Cart state
  const [cartItems, setCartItems] = useState([]);

  console.log(wishlist, 'wishlists');
  console.log(cartItems, 'cart items');

  // Auth check
  const isLoggedIn = !!localStorage.getItem("authToken");

  // Subscribe to cart changes
  useEffect(() => {
    let unsubscribe = null;

    const setupCartSubscription = async () => {
      try {
        unsubscribe = await subscribeToCart((items) => {
          setCartItems(items);
        });
      } catch (error) {
        console.error("Error setting up cart subscription:", error);
      }
    };

    if (isLoggedIn) {
      setupCartSubscription();
    } else {
      setCartItems([]); // Clear cart if not logged in
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isLoggedIn]);

  // Click outside closes dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowWomenCategories(false);
        setActiveCategory(null);
      }
    };
    if (showWomenCategories) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showWomenCategories]);

  // Auth-protected route navigation
  const handleProtectedClick = (callback) => {
    if (!isLoggedIn) {
      toast.error("Please log in to continue!");
      navigate('/B2c-login');
    } else {
      callback();
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setShowWomenCategories(false);
  };

  const toggleWomenCategories = () => {
    setShowWomenCategories((prev) => !prev);
    setActiveCategory(null);
  };

  const handleSubcategoryClick = (subcategoryName) => {
    navigate(`/products?category=${encodeURIComponent(subcategoryName)}`);
    setShowWomenCategories(false);
    setActiveCategory(null);
    setMobileMenuOpen(false);
  };

  const handleTryOnClick = () => {
    setShowModal(true);
  };

  const handleYes = () => {
    setShowModal(false);
    navigate("/products");
  };

  const handleNo = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <header className="relative bg-white sticky top-0 z-50 shadow-md">
      {/* Search View */}
      {searchOpen ? (
        <div className="flex justify-between items-start px-4 sm:px-6 py-4 bg-white">
          <div className="flex flex-col items-center flex-1">
            <div className="mb-4">
              <img
                src={b2clogo}
                alt="logo"
                className="h-8 sm:h-12 object-contain"
              />
            </div>
            <div className="flex items-center w-full sm:w-2/3">
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-b border-gray-300 px-3 py-2 outline-none text-sm sm:text-base"
              />
              <button
                className="ml-2 bg-blue-900 text-white px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap"
                onClick={() => navigate(`/search?query=${searchQuery}`)}
              >
                SEARCH
              </button>
            </div>
          </div>
          <FaTimes
            className="text-lg sm:text-xl text-gray-600 cursor-pointer ml-2 sm:ml-4 mt-2"
            onClick={() => setSearchOpen(false)}
          />
        </div>
      ) : (
        <>
          {/* Top Row */}
          <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
            {/* Hamburger */}
            <div className="flex items-center lg:hidden">
              <FaBars
                className="text-xl text-gray-600 cursor-pointer"
                onClick={toggleMobileMenu}
              />
            </div>
            <div className="hidden md:block md:w-1/3"></div>
            {/* Logo */}
            <div className="flex justify-center flex-1 md:w-1/3">
              <img
                src={b2clogo}
                alt="logo"
                className="h-8 sm:h-10 md:h-12 object-contain cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            {/* Desktop Icons */}
            <div className="flex justify-end items-center space-x-3 sm:space-x-4 md:space-x-6 md:w-1/3">
              {/* Mobile search icon */}
              <FaSearch
                className="md:hidden text-lg cursor-pointer text-gray-600 hover:text-blue-900"
                onClick={() => setSearchOpen(true)}
              />
              {/* Favorites, Cart, Profile */}
              <div className="hidden md:flex items-center space-x-6 text-xl text-blue-900">
                {/* Wishlist with badge */}
                <div className="relative">
                  <img
                    className="cursor-pointer w-5 h-5"
                    src={fav}
                    alt="wishlist"
                    onClick={() =>
                      handleProtectedClick(() => navigate("/mywishlist"))
                    }
                  />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </div>

                {/* Cart with badge */}
                <div className="relative">
                  <img
                    className="cursor-pointer w-5 h-5"
                    src={cart}
                    alt="cart"
                    onClick={() =>
                      handleProtectedClick(() => navigate("/mycart"))
                    }
                  />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </div>

                <img
                  className="cursor-pointer w-5 h-5"
                  src={profile}
                  alt="profile"
                  onClick={() =>
                    handleProtectedClick(() => navigate("/your-profile"))
                  }
                />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
         {/* Desktop Navigation */}
          <nav className="flex flex-row lg:flex-row lg:justify-center justify-around items-center border-t border-b border-gray-300 py-4 text-sm font-medium text-gray-700 space-y-2  lg:space-y-0 lg:space-x-8 relative">
 <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleWomenCategories}
                className="text-blue-900  cursor-pointer font-semibold lg:text-xl hover:text-blue-700 text-sm"
              >
                WOMEN
              </button>
              {showWomenCategories && (
                <div
                  className="fixed left-0 right-0 mt-4 lg:mt-0  cursor-pointer bg-gray-100 shadow-md z-50 w-screen"
                >
                  <div className="flex justify-center items-center space-x-8  pt-4 pb-3 border-b border-gray-200">
                    {Object.keys(womenCategories).map((cat, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveCategory(cat)}
                        className={`transition text-[16px] pb-2 ${
                          activeCategory === cat
                            ? "text-blue-900 border-b-2 cursor-pointer border-blue-900"
                            : "hover:text-blue-900 cursor-pointer"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  {activeCategory && (
                    <div className="w-full  bg-white py-8 px-4">
                      <div className="max-w-7xl mx-auto flex justify-center gap-8 flex-wrap">
                        {womenCategories[activeCategory].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col items-center w-32 cursor-pointer"
                            onClick={() => handleSubcategoryClick(item.name)}
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              className="h-14 w-20  lg:h-32 lg:w-24 object-contain lg:object-cover   rounded shadow-sm hover:scale-105 transition"
                            />
                            <span className="mt-2 text-xs font-medium text-gray-700 text-center">
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
             <span className="text-gray-500 cursor-pointer hover:text-gray-700 lg:text-xl text-sm">
              MEN <span className="text-xs">(coming soon)</span>
            </span>
            <span className="text-gray-500 cursor-pointer hover:text-gray-700 lg:text-xl text-sm">
              KIDS <span className="text-xs">(coming soon)</span>
            </span>
            <button className="text-[18px] hidden lg:block" onClick={handleTryOnClick}>2D TRY ON</button>
            <FaSearch
              className="ml-6 hidden lg:block cursor-pointer text-gray-600 hover:text-blue-900 text-[18px]"
              onClick={() => setSearchOpen(true)}
            />
            </nav>

          {/* MOBILE OVERLAY MENU */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setMobileMenuOpen(false)}
              ></div>
              <div className="fixed top-0 left-0 w-4/5 max-w-sm h-full bg-white shadow-lg overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                  <img
                    src={b2clogo}
                    alt="logo"
                    className="h-8 object-contain"
                  />
                  <FaTimes
                    className="text-xl text-gray-600 cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>
                <div className="p-4">
                  {/* Mobile Women Dropdown */}
                  <div className="mb-4">
                      <button
                        className="flex justify-between items-center w-full text-left text-blue-900 font-semibold py-2"
                        onClick={toggleWomenCategories}
                      >
                        WOMEN
                        <span
                          className={`transform transition-transform ${
                            showWomenCategories ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>
                    {showWomenCategories && (
                      <div className="mt-2 ml-4">
                        {Object.keys(womenCategories).map((cat, index) => (
                          <div key={index} className="mb-3">
                            <button
                              className={`block w-full text-left py-2 px-2 text-sm font-medium transition ${
                                activeCategory === cat
                                  ? "text-blue-900 bg-blue-50 rounded"
                                  : "text-gray-700 hover:text-blue-900"
                              }`}
                              onClick={() =>
                                setActiveCategory(
                                  activeCategory === cat ? null : cat
                                )
                              }
                            >
                              {cat}
                            </button>
                            {activeCategory === cat && (
                              <div className="mt-2 ml-4 grid grid-cols-2 gap-3">
                                {womenCategories[cat].map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() =>
                                      handleSubcategoryClick(item.name)
                                    }
                                  >
                                    <img
                                      src={item.img}
                                      alt={item.name}
                                      className="h-16 w-12 object-cover rounded shadow-sm"
                                    />
                                    <span className="mt-1 text-xs text-center text-gray-700">
                                      {item.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )} 
                    
                  </div>
                  <span className="block py-3 text-gray-500 border-t cursor-default">
                    MEN <span className="text-xs">(coming soon)</span>
                  </span>
                  <span className="block py-3 text-gray-500 border-t cursor-default">
                    KIDS <span className="text-xs">(coming soon)</span>
                  </span>
                  <span
                    className="block py-3 text-gray-700 cursor-default" //border-t 
                    onClick={handleTryOnClick}
                  >
                    2D TRY ON
                  </span>
                  {/* Mobile bottom icons */}
                  <div className="flex justify-around items-center mt-8 pt-4 border-t">
                    {/* Wishlist with badge */}
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() =>
                        handleProtectedClick(() => navigate("/mywishlist"))
                      }
                    >
                      <div className="relative">
                        <img className="w-6 h-6 mb-1" src={fav} alt="wishlist" />
                        {wishlist.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {wishlist.length}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-600">Wishlist</span>
                    </div>

                    {/* Cart with badge */}
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() =>
                        handleProtectedClick(() => navigate("/mycart"))
                      }
                    >
                      <div className="relative">
                        <img className="w-6 h-6 mb-1" src={cart} alt="cart" />
                        {cartItems.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItems.length}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-600">Cart</span>
                    </div>

                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() =>
                        handleProtectedClick(() => navigate("/your-profile"))
                      }
                    >
                      <img className="w-6 h-6 mb-1" src={profile} alt="profile" />
                      <span className="text-xs text-gray-600">Profile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <p className="text-gray-800 mb-4 text-center">
                  For try-on you need to select a product. <br />
                  Would you like to try?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleYes}
                    className="px-4 py-2 bg-[#5B9BA5] text-white rounded-lg hover:bg-blue-950"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleNo}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Navbar;



