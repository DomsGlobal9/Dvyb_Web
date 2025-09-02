// utils/filterUtils.js

// Filter options configuration
export const FILTER_OPTIONS = {
  priceSort: [
    'RECOMMENDED',
    'PRICE HIGH TO LOW',
    'PRICE LOW TO HIGH',
    'MUST HAVE'
  ],
  fabric: [
    'COTTON', 'CREPE', 'CHIFFON', 'KHADI', 'SILK', 'SILK COTTON',
    'TISSUE', 'PURE LINEN', 'ORGANZA', 'TUSSAR', 'KOTA',
    'GEORGETTE', 'VISCOSE', 'MULMUL'
  ],
  colors: [
    'RED', 'ORANGE', 'YELLOW', 'BLUE', 'PURPLE', 'BLACK', 'WHITE',
    'GREEN', 'PINK', 'BROWN', 'GREY', 'MAROON', 'NAVY', 'BEIGE'
  ],
  craft: [
    'EMBROIDERED', 'AJRAKH', 'BLOCK PRINTED', 'BATIK', 'SANGANERI',
    'WOVEN', 'DABU', 'SHIBORI', 'BROCADE', 'MUKASISH', 'PRINTED',
    'CUTOUT', 'IKAT', 'CHIKANKARIUL'
  ],
  collection: [
    'FESTIVE WEAR', 'WEDDING WEAR', 'CASUAL WEAR', 'FORMAL WEAR',
    'PARTY WEAR', 'TRADITIONAL WEAR'
  ],
  category: [
    'UNSTITCHED SUITS SET', 'STITCHED SUITS SET'
  ],
  discount: [
    '10-20%', '30-40%', '50-60%', '70-80%'
  ]
};

// Categories for main category filtering
export const CATEGORIES = [
  'ALL', 'SAREE', 'SALWAR SUITS', 'LEHENGAS', 'ANARKALI', 'DUPATTAS', 'ETHNIC JACKET'
];

// Default filter state
export const DEFAULT_FILTERS = {
  priceSort: 'RECOMMENDED',
  fabric: [],
  colors: [],
  craft: [],
  collection: [],
  category: [],
  discount: [],
  priceRange: { min: '', max: '' }
};

// Default filter sections state
export const DEFAULT_FILTER_SECTIONS = {
  price: true,
  fabric: false,
  colors: false,
  craft: false,
  collection: false,
  category: false,
  discount: false
};

// Filter utility functions
export const filterUtils = {
  // Get count of products for each filter option
  getFilterCount(products, filterType, option) {
    return products.filter(product => {
      switch (filterType) {
        case 'colors':
          return product.selectedColors?.some(color => 
            color.toUpperCase() === option.toUpperCase()
          );
        case 'fabric':
          return product.fabric?.toUpperCase() === option.toUpperCase();
        case 'craft':
          return product.craft?.toUpperCase() === option.toUpperCase() ||
                 product.description?.toUpperCase().includes(option.toUpperCase());
        case 'collection':
          return product.occasion?.toUpperCase() === option.replace(' WEAR', '').toUpperCase() ||
                 product.collection?.toUpperCase() === option.toUpperCase();
        case 'category':
          return product.category?.toUpperCase().includes(option.split(' ')[0]) ||
                 product.dressType?.toUpperCase().includes(option.split(' ')[0]);
        case 'discount':
          const discountRange = option.split('-');
          const minDiscount = parseInt(discountRange[0]);
          const maxDiscount = parseInt(discountRange[1]?.replace('%', '') || minDiscount);
          return product.discount >= minDiscount && product.discount <= maxDiscount;
        default:
          return true;
      }
    }).length;
  },

  // Apply all filters to products
  applyFilters(products, filters, selectedCategory, searchTerm) {
    let filtered = products.filter((product) => {
      // Search filter
      const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
      
      // Fabric filter
      const matchesFabric = filters.fabric.length === 0 || 
                           filters.fabric.some(f => product.fabric?.toUpperCase() === f);
      
      // Colors filter
      const matchesColors = filters.colors.length === 0 || 
                            filters.colors.some(c => 
                              product.selectedColors?.some(color => 
                                color.toUpperCase() === c.toUpperCase()
                              )
                            );
      
      // Craft filter
      const matchesCraft = filters.craft.length === 0 || 
                          filters.craft.some(c => 
                            product.craft?.toUpperCase() === c ||
                            product.description?.toUpperCase().includes(c)
                          );
      
      // Collection filter
      const matchesCollection = filters.collection.length === 0 || 
                               filters.collection.some(c => 
                                 product.occasion?.toUpperCase() === c.replace(' WEAR', '').toUpperCase() ||
                                 product.collection?.toUpperCase() === c.toUpperCase()
                               );
      
      // Category filter (suits)
      const matchesCategoryFilter = filters.category.length === 0 || 
                                   filters.category.some(c => 
                                     product.category?.toUpperCase().includes(c.split(' ')[0]) ||
                                     product.dressType?.toUpperCase().includes(c.split(' ')[0])
                                   );
      
      // Discount filter
      const matchesDiscount = filters.discount.length === 0 ||
                             filters.discount.some(d => {
                               const discountRange = d.split('-');
                               const minDiscount = parseInt(discountRange[0]);
                               const maxDiscount = parseInt(discountRange[1]?.replace('%', '') || minDiscount);
                               return product.discount >= minDiscount && product.discount <= maxDiscount;
                             });
      
      // Price range filter
      const price = parseFloat(product.price || 0);
      const matchesPriceRange = (!filters.priceRange.min || price >= parseFloat(filters.priceRange.min)) &&
                               (!filters.priceRange.max || price <= parseFloat(filters.priceRange.max));
      
      return matchesSearch && matchesCategory && matchesFabric && matchesColors && 
             matchesCraft && matchesCollection && matchesCategoryFilter && 
             matchesDiscount && matchesPriceRange;
    });

    return this.applySorting(filtered, filters.priceSort);
  },

  // Apply sorting to filtered products
  applySorting(products, sortType) {
    const sorted = [...products];
    
    switch (sortType) {
      case 'PRICE LOW TO HIGH':
        sorted.sort((a, b) => parseFloat(a.price || 0) - parseFloat(b.price || 0));
        break;
      case 'PRICE HIGH TO LOW':
        sorted.sort((a, b) => parseFloat(b.price || 0) - parseFloat(a.price || 0));
        break;
      case 'MUST HAVE':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // RECOMMENDED
        sorted.sort((a, b) => {
          const timeA = a.timestamp || new Date(0);
          const timeB = b.timestamp || new Date(0);
          return timeB - timeA;
        });
    }

    return sorted;
  },

  // Count active filters
  countActiveFilters(filters, selectedCategory) {
    let count = 0;
    
    // Count array filters
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        count += value.length;
      } else if (key === 'priceRange' && typeof value === 'object') {
        count += (value.min ? 1 : 0) + (value.max ? 1 : 0);
      } else if (key === 'priceSort' && value !== 'RECOMMENDED') {
        count += 1;
      }
    });
    
    // Count category filter
    if (selectedCategory !== 'ALL') {
      count += 1;
    }
    
    return count;
  },

  // Generate active filter chips data
  getActiveFilterChips(filters, selectedCategory) {
    const chips = [];
    
    // Category chip
    if (selectedCategory !== 'ALL') {
      chips.push({
        type: 'category',
        value: selectedCategory,
        displayValue: selectedCategory,
        onRemove: () => ({ type: 'category', value: 'ALL' })
      });
    }
    
    // Array filter chips
    Object.entries(filters).forEach(([filterType, filterValue]) => {
      if (Array.isArray(filterValue) && filterValue.length > 0) {
        filterValue.forEach(value => {
          chips.push({
            type: filterType,
            value: value,
            displayValue: value,
            onRemove: () => ({ type: filterType, value: value, remove: true })
          });
        });
      } else if (filterType === 'priceSort' && filterValue !== 'RECOMMENDED') {
        chips.push({
          type: 'priceSort',
          value: filterValue,
          displayValue: `Sort: ${filterValue}`,
          onRemove: () => ({ type: 'priceSort', value: 'RECOMMENDED' })
        });
      } else if (filterType === 'priceRange' && (filterValue.min || filterValue.max)) {
        chips.push({
          type: 'priceRange',
          value: filterValue,
          displayValue: `Price: ${filterValue.min || '0'} - ${filterValue.max || '∞'}`,
          onRemove: () => ({ type: 'priceRange', value: { min: '', max: '' } })
        });
      }
    });
    
    return chips;
  }
};