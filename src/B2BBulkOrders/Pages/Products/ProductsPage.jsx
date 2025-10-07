import React, { useState, useEffect, useMemo } from 'react';
import { AlertCircle, RefreshCw, Database, Plus, Filter, X, Package } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { productService, debugService } from '../../../services/firebaseServices';

// Import utils
import {
  FILTER_OPTIONS,
  CATEGORIES,
  DEFAULT_FILTERS,
  DEFAULT_FILTER_SECTIONS,
  filterUtils
} from '../../../utils/filterUtils';

// Import components
import ProductCard from '../../Components/products/ProductCard';
import FilterSidebar from '../../Components/products/FiltersBar';
import ProductDetailPage from './ProductDetails';
import Navbar from '../../../common/Navbar/b2cNavbar';

const ProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debugInfo, setDebugInfo] = useState({});
  const [creatingTestData, setCreatingTestData] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [favorites, setFavorites] = useState(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleNavigateToTryOn = ({ garmentImage }) => {
    navigate('/TryYourOutfit', { state: { garmentImage } });
  };

  // Filter states
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filterSections, setFilterSections] = useState(DEFAULT_FILTER_SECTIONS);

  // Handler functions
  const toggleFilterSection = (section) => {
    setFilterSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value, isRemove = false) => {
    setFilters(prev => {
      if (filterType === 'priceSort') {
        return { ...prev, priceSort: value };
      } else if (filterType === 'priceRange') {
        return { ...prev, priceRange: { ...prev.priceRange, ...value } };
      } else {
        const currentFilters = prev[filterType] || [];
        if (isRemove) {
          return {
            ...prev,
            [filterType]: currentFilters.filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            [filterType]: currentFilters.includes(value)
              ? currentFilters.filter(item => item !== value)
              : [...currentFilters, value]
          };
        }
      }
    });
  };

  const clearAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSelectedCategory('ALL');
    setSearchTerm('');
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  // Create test data
  const createTestData = async () => {
    setCreatingTestData(true);
    try {
      await testDataService.createTestData();
      window.location.reload();
    } catch (error) {
      console.error('❌ Error creating test data:', error);
      alert(`Error creating test data: ${error.message}`);
    } finally {
      setCreatingTestData(false);
    }
  };

  useEffect(() => {
  const cat = (selectedCategory || '').toLowerCase().replace('_', ' ');
  const hideSizesFor = ['saree', 'designer saree'];

  if (hideSizesFor.includes(cat) && (filters.selectedSizes?.length || 0) > 0) {
    setFilters(prev => ({ ...prev, selectedSizes: [] }));
  }
}, [selectedCategory]); // eslint-disable-line react-hooks/exhaustive-deps


  // Data fetching
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🚀 Starting product fetch...');
        const debugResults = await debugService.runDebugTests();
        setDebugInfo(debugResults);

        const fetchedProducts = await productService.fetchAllProducts();
        setProducts(fetchedProducts);
        console.log('✅ Products state updated successfully');

      } catch (error) {
        console.error('💥 Error in fetchAllProducts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Handle query params for category filtering from navbar
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      const decodedCategory = decodeURIComponent(category);
      // Assuming CATEGORIES includes possible values; you can add validation if needed
      setSelectedCategory(decodedCategory);
    }
  }, [location.search]);

  // Apply filters and search
  const filteredProducts = useMemo(() => {
    return filterUtils.applyFilters(products, filters, selectedCategory, searchTerm);
  }, [products, searchTerm, selectedCategory, filters]);
  console.log("selected products", selectedCategory)

  // Count active filters
  const activeFiltersCount = filterUtils.countActiveFilters(filters, selectedCategory);

  // Get active filter chips
  const activeFilterChips = filterUtils.getActiveFilterChips(filters, selectedCategory);

  // Format date utility
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Prevent body scroll when mobile filters are open
  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileFilters]);


  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
          <p className="text-sm text-gray-500 mt-2">Check console for detailed logs</p>
        </div>
      </div>
    );
  }

  // Error state with debug info
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-2xl p-6 bg-white rounded-lg shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>

          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors mr-3"
            >
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state with test data creation
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products available</h3>
            <p className="text-gray-600 mb-6">No vendors have created products yet</p>

            <div className="mb-6">
              <button
                onClick={createTestData}
                disabled={creatingTestData}
                className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 inline mr-2" />
                {creatingTestData ? 'Creating Test Data...' : 'Create Test Products'}
              </button>
              <p className="text-sm text-gray-500 mt-2">
                This will create sample vendors and products for testing
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
     <Navbar />
      {/* Header - Fixed */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeFilterChips.map((chip, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  {chip.displayValue}
                  <button
                    onClick={() => {
                      const action = chip.onRemove();
                      if (action.type === 'category') {
                        setSelectedCategory(action.value);
                      } else {
                        handleFilterChange(action.type, action.value, action.remove);
                      }
                    }}
                    className="ml-2 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="fixed right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl">
            <FilterSidebar
            selectedCategory={selectedCategory}  
              isMobile={true}
              filters={filters}
              filterSections={filterSections}
              filterOptions={FILTER_OPTIONS}
              products={products}
              activeFiltersCount={activeFiltersCount}
              onFilterChange={handleFilterChange}
              onToggleFilterSection={toggleFilterSection}
              onClearAllFilters={clearAllFilters}
              onCloseMobile={() => setShowMobileFilters(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar - Sticky */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
            selectedCategory={selectedCategory}
              filters={filters}
              filterSections={filterSections}
              filterOptions={FILTER_OPTIONS}
              products={products}
              activeFiltersCount={activeFiltersCount}
              onFilterChange={handleFilterChange}
              onToggleFilterSection={toggleFilterSection}
              onClearAllFilters={clearAllFilters}
            />
          </div>

          {/* Products Grid - Scrollable */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={(p) => navigate(`/products/${p.id}`)} // 👈 navigate instead of setSelectedProduct
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.has(product.id)}
                  />

                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  {products.length === 0
                    ? "No products are available"
                    : "No products match your current filters"}
                </p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;