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
// import logo from "../../assets/Navbar/DVYB_Enterprise_Logo.png";
import b2clogo from "../../assets/Navbar/B2cLogo.png";
import fav from "../../assets/B2Bassets/NavbarImages/heart.png";
import cart from "../../assets/B2Bassets/NavbarImages/cart.png";
import profile from "../../assets/B2Bassets/NavbarImages/profile.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showWomenCategories, setShowWomenCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Auth check (from localStorage or context/provider if used)
  const isLoggedIn = !!localStorage.getItem("authToken");

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

  // Render
  return (
    <header className="border-b relative bg-white sticky top-0 z-50">
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
                <img
                  className="cursor-pointer w-5 h-5"
                  src={fav}
                  alt="wishlist"
                  onClick={() =>
                    handleProtectedClick(() => navigate("/mywishlist"))
                  }
                />
                <img
                  className="cursor-pointer w-5 h-5"
                  src={cart}
                  alt="cart"
                  onClick={() =>
                    handleProtectedClick(() => navigate("/mycart"))
                  }
                />
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
          <nav className="hidden lg:flex justify-center items-center space-x-8 py-2 text-sm font-medium text-gray-700 relative">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleWomenCategories}
                className="text-blue-900 font-semibold hover:text-blue-700"
              >
                WOMEN
              </button>
              {showWomenCategories && (
                <div
                  className="absolute left-0 right-0 top-full bg-gray-100 border-t shadow-md z-50"
                  style={{
                    left: "470%",
                    width: "100vw",
                    marginLeft: "-50vw",
                  }}
                >
                  <div className="flex justify-center space-x-8 py-3 text-sm font-medium text-gray-700 border-b">
                    {Object.keys(womenCategories).map((cat, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveCategory(cat)}
                        className={`transition ${
                          activeCategory === cat
                            ? "text-blue-900 border-b-2 border-blue-900"
                            : "hover:text-blue-900"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  {activeCategory && (
                    <div className="flex justify-center gap-8 py-6 flex-wrap bg-white">
                      {womenCategories[activeCategory].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center w-32 cursor-pointer"
                          onClick={() => handleSubcategoryClick(item.name)}
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="h-32 w-24 object-cover rounded shadow-sm hover:scale-105 transition"
                          />
                          <span className="mt-2 text-xs font-medium text-gray-700">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Static other links */}
            <span className="text-gray-500 hover:text-gray-700 cursor-default">
              MEN <span className="text-xs">(coming soon)</span>
            </span>
            <span className="text-gray-500 hover:text-gray-700 cursor-default">
              KIDS <span className="text-xs">(coming soon)</span>
            </span>
            <a href="#" className="text-gray-700 hover:text-blue-900">
              2D TRY ON
            </a>
            <FaSearch
              className="ml-6 cursor-pointer text-gray-600 hover:text-blue-900"
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
                                    onClick={() => handleSubcategoryClick(item.name)}
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
                  {/* Static mobile nav items */}
                  <span className="block py-3 text-gray-500 border-t cursor-default">
                    MEN <span className="text-xs">(coming soon)</span>
                  </span>
                  <span className="block py-3 text-gray-500 border-t cursor-default">
                    KIDS <span className="text-xs">(coming soon)</span>
                  </span>
                  <span className="block py-3 text-gray-700 border-t cursor-default">
                    2D TRY ON
                  </span>
                  {/* Mobile bottom icons */}
                  <div className="flex justify-around items-center mt-8 pt-4 border-t">
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() =>
                        handleProtectedClick(() => navigate("/mywishlist"))
                      }
                    >
                      <img className="w-6 h-6 mb-1" src={fav} alt="favorites" />
                      <span className="text-xs text-gray-600">Wishlist</span>
                    </div>
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() =>
                        handleProtectedClick(() => navigate("/mycart"))
                      }
                    >
                      <img className="w-6 h-6 mb-1" src={cart} alt="cart" />
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
        </>
      )}
    </header>
  );
};

export default Navbar;