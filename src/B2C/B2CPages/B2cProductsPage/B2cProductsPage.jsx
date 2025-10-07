import React, { useState, useEffect, useMemo } from 'react';
import { AlertCircle, RefreshCw, Database, Plus, Filter, X, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
// Import services
import { productService, debugService } from '../../../services/firebaseServices';
// import { testDataService } from '../services/testDataService';
import { normalizeColorToCode } from '../../../utils/colorNormalize';


// Import utils
import { 
  FILTER_OPTIONS, 
  CATEGORIES, 
  DEFAULT_FILTERS, 
  DEFAULT_FILTER_SECTIONS,
  filterUtils 
} from '../../../utils/filterUtils';

// Import components
import ProductCard from '../../../B2BBulkOrders/Components/products/ProductCard';
import FilterSidebar from '../../../B2BBulkOrders/Components/products/FiltersBar';
import ProductDetailPage from '../../../B2BBulkOrders/Pages/Products/ProductDetails';

const B2cProductsPage = () => {

  const navigate = useNavigate(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debugInfo, setDebugInfo] = useState({});
  const [showDebug, setShowDebug] = useState(false);
  const [creatingTestData, setCreatingTestData] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
    // single-select or object updates
    if (filterType === 'priceSort') {
      return { ...prev, priceSort: value };
    }
    if (filterType === 'priceRange') {
      return { ...prev, priceRange: { ...prev.priceRange, ...value } };
    }

    // multi-selects
    const current = prev[filterType] || [];

    // normalize only for colors; keep others as strings
    const norm = filterType === 'selectedColors'
      ? normalizeColorToCode(value)
      : String(value);

    const exists = current.some(v => {
      const nv = filterType === 'selectedColors' ? normalizeColorToCode(v) : String(v);
      return nv === norm;
    });

    let next;
    if (isRemove || exists) {
      next = current.filter(v => {
        const nv = filterType === 'selectedColors' ? normalizeColorToCode(v) : String(v);
        return nv !== norm;
      });
    } else {
      next = [...current, norm];
    }

    return { ...prev, [filterType]: next };
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

  // Apply filters and search
  const filteredProducts = useMemo(() => {
    return filterUtils.applyFilters(products, filters, selectedCategory, searchTerm);
  }, [products, searchTerm, selectedCategory, filters]);

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

  // Product Detail View
  if (selectedProduct) {
    return (
      <ProductDetailPage 
        product={selectedProduct} 
        onBackClick={() => setSelectedProduct(null)}

        allProducts={products} // Make sure this line is included
        onNavigateToTryOn={handleNavigateToTryOn}
        onProductClick={setSelectedProduct}
      />
    );
  }

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
            
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {showDebug ? 'Hide' : 'Show'} Debug Info
            </button>
          </div>
          
          {showDebug && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
              <h3 className="font-semibold mb-2">Debug Information:</h3>
              <pre className="text-xs overflow-auto max-h-64">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
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
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">WOMEN'S WEAR</h1>
              <p className="text-gray-600">
                {filteredProducts.length} of {products.length} product{products.length !== 1 ? 's' : ''} 
                {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount !== 1 ? 's' : ''} applied)`}
              </p>
            </div>
            
            {/* Search Bar & Mobile Filter Toggle */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full lg:w-64"
              />
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-white text-blue-600 text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setShowDebug(!showDebug)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                {showDebug ? 'Hide' : 'Show'} Debug
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
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
      </div>

      {/* Debug Panel */}
      {showDebug && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center">
                <Database className="w-4 h-4 mr-2" />
                Debug Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="font-medium text-blue-800">Total Products</div>
                  <div className="text-blue-600">{products.length}</div>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <div className="font-medium text-green-800">Filtered Results</div>
                  <div className="text-green-600">{filteredProducts.length}</div>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <div className="font-medium text-purple-800">Active Filters</div>
                  <div className="text-purple-600">{activeFiltersCount}</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded">
                  <div className="font-medium text-yellow-800">Firestore Status</div>
                  <div className="text-yellow-600">
                    {debugInfo.firebaseConnected ? 'Connected' : 'Error'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
          <div className="fixed right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl overflow-y-auto">
            <FilterSidebar 
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
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar 
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

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={setSelectedProduct}
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

export default B2cProductsPage;