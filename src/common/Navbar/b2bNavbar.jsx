import React, { useState, useEffect, useRef } from 'react';
import { FaHeart, FaShoppingBag, FaUser, FaSearch, FaTimes, FaBars } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { womenCategories } from './navCatData';
import b2blogo from '../../assets/Navbar/DVYB_Enterprise_Logo.png';
import fav from '../../assets/B2Bassets/NavbarImages/heart.png';
import cart from '../../assets/B2Bassets/NavbarImages/cart.png';
import profile from '../../assets/B2Bassets/NavbarImages/profile.png';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import { useFilter } from '../../context/FilterContext';
import { useAuth } from '../../context/AuthContext';

const B2bnavbar = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const { setSelectedCategory, setFilters } = useFilter();
  const [showWomenCategories, setShowWomenCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { user, userData } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowWomenCategories(false);
        setActiveCategory(null);
      }
    };

    if (showWomenCategories) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showWomenCategories]);

  const isLoggedIn = !!localStorage.getItem('authToken');

  const handleProtectedClick = (callback) => {
    if (!isLoggedIn) {
      toast.error('Please log in to continue!', { position: 'top-center' });
    } else {
      callback();
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setShowWomenCategories(false);
  };

  const toggleWomenCategories = () => {
    setShowWomenCategories(!showWomenCategories);
    setActiveCategory(null);
    setSelectedCategory('WOMEN');
  };

  const handleSubCategoryClick = (subCategory) => {
    setFilters(prev => ({
      ...prev,
      dressType: prev.dressType.includes(subCategory)
        ? prev.dressType.filter(item => item !== subCategory)
        : [...prev.dressType, subCategory],
    }));
  };

  return (
    <header className="border-b relative bg-white sticky top-0 z-50">
      {searchOpen ? (
        <div className="flex justify-between items-start px-4 sm:px-6 py-4 bg-white">
          <div className="flex flex-col items-center flex-1">
            <div className="mb-4">
              <img src={b2blogo} alt="logo" className="h-8 sm:h-12 object-contain" />
            </div>
            <div className="flex items-center w-full sm:w-2/3">
              <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-b border-gray-300 px-3 py-2 outline-none text-sm sm:text-base"
              />
              <button className="ml-2 bg-blue-900 text-white px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
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
          <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center lg:hidden">
              <FaBars
                className="text-xl text-gray-600 cursor-pointer"
                onClick={toggleMobileMenu}
              />
            </div>
            <div className="hidden md:block md:w-1/3"></div>
            <div className="flex justify-center flex-1 md:w-1/3">
              <img src={b2blogo} alt="logo" className="h-8 sm:h-10 md:h-12 object-contain" />
            </div>
            <div className="flex justify-end items-center space-x-3 sm:space-x-4 md:space-x-6 md:w-1/3">
              <FaSearch
                className="md:hidden text-lg cursor-pointer text-gray-600 hover:text-blue-900"
                onClick={() => setSearchOpen(true)}
              />
              <div className="hidden md:flex items-center space-x-6 text-xl text-blue-900">
                <img
                  className="cursor-pointer w-5 h-5"
                  src={fav}
                  alt="favorites"
                  onClick={() => handleProtectedClick(() => navigate('/mywishlist'))}
                />
                <img
                  className="cursor-pointer w-5 h-5"
                  src={cart}
                  alt="cart"
                  onClick={() => handleProtectedClick(() => navigate('/mycart'))}
                />
                <img
                  className="cursor-pointer w-5 h-5"
                  src={profile}
                  alt="profile"
                  onClick={() => navigate('/your-profile')}
                />
              </div>
            </div>
          </div>
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
                    left: '470%',
                    width: '100vw',
                    marginLeft: '-50vw',
                  }}
                >
                  <div className="flex justify-center space-x-8 py-3 text-sm font-medium text-gray-700 border-b">
                    {Object.keys(womenCategories).map((cat, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveCategory(cat)}
                        className={`transition ${
                          activeCategory === cat
                            ? 'text-blue-900 border-b-2 border-blue-900'
                            : 'hover:text-blue-900'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  {activeCategory && (
                    <div className="flex justify-center gap-8 py-6 flex-wrap bg-white">
                      {womenCategories[activeCategory].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center w-32">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="h-32 w-24 object-cover rounded shadow-sm hover:scale-105 transition"
                            onClick={() => handleSubCategoryClick(item.name)}
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
            <button
              onClick={() => setSelectedCategory('MEN')}
              className="text-gray-500 hover:text-gray-700"
            >
              MEN <span className="text-xs">(coming soon)</span>
            </button>
            <button
              onClick={() => setSelectedCategory('KIDS')}
              className="text-gray-500 hover:text-gray-700"
            >
              KIDS <span className="text-xs">(coming soon)</span>
            </button>
            <a href="#" className="text-gray-700 hover:text-blue-900">
              2D TRY ON
            </a>
            <FaSearch
              className="ml-6 cursor-pointer text-gray-600 hover:text-blue-900"
              onClick={() => setSearchOpen(true)}
            />
          </nav>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="fixed inset-0 bg-opacity-50"
                onClick={() => setMobileMenuOpen(false)}
              ></div>
              <div className="fixed top-0 left-0 w-4/5 max-w-sm h-full bg-white shadow-lg overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                  <img src={b2blogo} alt="logo" className="h-8 object-contain" />
                  <FaTimes
                    className="text-xl text-gray-600 cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <button
                      className="flex justify-between items-center w-full text-left text-blue-900 font-semibold py-2"
                      onClick={toggleWomenCategories}
                    >
                      WOMEN
                      <span className={`transform transition-transform ${showWomenCategories ? 'rotate-180' : ''}`}>
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
                                  ? 'text-blue-900 bg-blue-50 rounded'
                                  : 'text-gray-700 hover:text-blue-900'
                              }`}
                              onClick={() =>
                                setActiveCategory(activeCategory === cat ? null : cat)
                              }
                            >
                              {cat}
                            </button>
                            {activeCategory === cat && (
                              <div className="mt-2 ml-4 grid grid-cols-2 gap-3">
                                {womenCategories[cat].map((item, idx) => (
                                  <div key={idx} className="flex flex-col items-center">
                                    <img
                                      src={item.img}
                                      alt={item.name}
                                      className="h-16 w-12 object-cover rounded shadow-sm"
                                      onClick={() => handleSubCategoryClick(item.name)}
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
                  <button
                    onClick={() => setSelectedCategory('MEN')}
                    className="block py-3 text-gray-500 border-t"
                  >
                    MEN <span className="text-xs">(coming soon)</span>
                  </button>
                  <button
                    onClick={() => setSelectedCategory('KIDS')}
                    className="block py-3 text-gray-500 border-t"
                  >
                    KIDS <span className="text-xs">(coming soon)</span>
                  </button>
                  <a href="#" className="block py-3 text-gray-700 border-t">
                    2D TRY ON
                  </a>
                  <div className="flex justify-around items-center mt-8 pt-4 border-t">
                    <div
                      className="flex flex-col items-center"
                      onClick={() => handleProtectedClick(() => navigate('/favorites'))}
                    >
                      <img className="w-6 h-6 mb-1" src={fav} alt="favorites" />
                      <span className="text-xs text-gray-600">Favorites</span>
                    </div>
                    <div
                      className="flex flex-col items-center"
                      onClick={() => handleProtectedClick(() => navigate('/cart'))}
                    >
                      <img className="w-6 h-6 mb-1" src={cart} alt="cart" />
                      <span className="text-xs text-gray-600">Cart</span>
                    </div>
                    <div
                      className="flex flex-col items-center"
                      onClick={() => handleProtectedClick(() => navigate('/your-profile'))}
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

export default B2bnavbar;