export const CATEGORIES = [
  'ALL',
  'SAREE',
  'SALWAR SUITS',
  'LEHENGAS',
  'ANARKALI',
  'DUPATTAS',
  'ETHNIC JACKET',
  'T-SHIRTS',
  'SHIRTS',
  'BLOUSES',
  'JEANS',
  'TROUSERS',
  'SKIRTS',
  'MAXI DRESSES',
  'JUMPSUITS',
  'NIGHT SUITS',
  'PAJAMAS',
  'SPORTS BRAS',
  'LEGGINGS',
  'SWEATERS',
  'JACKETS',
];

export const FILTER_OPTIONS = {
  priceSort: ['Low to High', 'High to Low'],
  category: ['WOMEN', 'MEN', 'KIDS'],
   selectedColors: [
    { name: 'red', hex: '#FF0000' },
    { name: 'pink', hex: '#FFC0CB' },
    { name: 'blue', hex: '#0000FF' },
    { name: 'green', hex: '#008000' },
    { name: 'orange', hex: '#FFA500' },
    { name: 'purple', hex: '#800080' },
    { name: 'black', hex: '#000000' },
    { name: 'white', hex: '#FFFFFF' },
    { name: 'yellow', hex: '#FFFF00' },
    { name: 'brown', hex: '#8B4513' },
    { name: 'gray', hex: '#808080' },
    { name: 'navy', hex: '#000080' },
  ],
  selectedSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  fabric: [
    'Cotton', 'Silk', 'Silk Cotton', 'Georgette', 'Chiffon', 'Net',
    'Velvet', 'Crepe', 'Khadi', 'Tissue', 'Pure Linen', 'Kota',
    'Viscose', 'Mulmul', 'Organza',
  ],
  craft: [
    'Embroidered', 'Ajrakh', 'Block Printed', 'Batik', 'Sanganeri',
    'Woven', 'Printed', 'Plain', 'Sequined', 'Beaded', 'Mirror Work',
    'Dabu', 'Shibori', 'Mukasish', 'Brocade', 'Cutout', 'Ikat', 'Chikankari',
  ],
  dressType: [
    'Traditional Lehenga', 'Designer Saree', 'Cotton Kurti', 'Silk Dress',
    'Party Wear', 'Casual Wear', 'Wedding Wear', 'Formal Wear',
  ],
};

export const DEFAULT_FILTERS = {
  priceSort: '',
  priceRange: { min: '', max: '' },
  category: [],
  selectedColors: [],
  selectedSizes: [],
  fabric: [],
  craft: [],
  dressType: [],
};

export const DEFAULT_FILTER_SECTIONS = {
  price: true,
  category: true,
  selectedColors: true,
  selectedSizes: true,
  fabric: true,
  craft: true,
  dressType: true,
};

export const filterUtils = {
  applyFilters(products, filters, selectedCategory, searchTerm) {
    let filtered = [...products];

    // Case-insensitive category filtering based on dressType
    if (selectedCategory !== 'ALL') {
      const normalizedSelected = selectedCategory.toLowerCase().replace(/s$/, ''); // Remove 's' for plural handling
      filtered = filtered.filter(product =>
        product.dressType?.toLowerCase().replace(/s$/, '') === normalizedSelected
      );
    }

    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        (product.title?.toLowerCase() || '').includes(searchLower) ||
        (product.name?.toLowerCase() || '').includes(searchLower) ||
        (product.description?.toLowerCase() || '').includes(searchLower) ||
        (product.dressType?.toLowerCase() || '').includes(searchLower) ||
        (product.fabric?.toLowerCase() || '').includes(searchLower) ||
        (product.craft?.toLowerCase() || '').includes(searchLower)
      );
    }

    // Apply dynamic filters
    Object.keys(filters).forEach(filterType => {
      if (filterType === 'priceSort' && filters.priceSort) {
        filtered = filtered.sort((a, b) => {
          const priceA = parseFloat(a.price) || 0;
          const priceB = parseFloat(b.price) || 0;
          return filters.priceSort === 'Low to High' ? priceA - priceB : priceB - priceA;
        });
      } else if (filterType === 'priceRange') {
        const { min, max } = filters.priceRange;
        if (min) {
          filtered = filtered.filter(product => parseFloat(product.price) >= parseFloat(min));
        }
        if (max) {
          filtered = filtered.filter(product => parseFloat(product.price) <= parseFloat(max));
        }
      } else if (filters[filterType]?.length > 0) {
        filtered = filtered.filter(product => {
          if (!product[filterType]) return false;
          if (Array.isArray(product[filterType])) {
            return filters[filterType].some(filterValue =>
              product[filterType].includes(filterValue)
            );
          }
          return filters[filterType].includes(product[filterType]);
        });
      }
    });

    return filtered;
  },

  getFilterCount(products, filterType, filterValue) {
    return products.filter(product => {
      if (filterType === 'category') {
        return product.dressType === filterValue; // Changed from product.category
      } else if (Array.isArray(product[filterType])) {
        return product[filterType].includes(filterValue);
      }
      return product[filterType] === filterValue;
    }).length;
  },

  countActiveFilters(filters, selectedCategory) {
    let count = 0;
    if (selectedCategory !== 'ALL') count++;
    if (filters.priceSort) count++;
    if (filters.priceRange.min || filters.priceRange.max) count++;
    Object.keys(filters).forEach(key => {
      if (key !== 'priceSort' && key !== 'priceRange' && filters[key]?.length > 0) {
        count += filters[key].length;
      }
    });
    return count;
  },

  getActiveFilterChips(filters, selectedCategory) {
    const chips = [];
    if (selectedCategory !== 'ALL') {
      chips.push({
        displayValue: selectedCategory.replace('_', ' '),
        onRemove: () => ({ type: 'category', value: 'ALL' }),
      });
    }
    if (filters.priceSort) {
      chips.push({
        displayValue: `Sort: ${filters.priceSort}`,
        onRemove: () => ({ type: 'priceSort', value: '', remove: true }),
      });
    }
    if (filters.priceRange.min) {
      chips.push({
        displayValue: `Min: ₹${filters.priceRange.min}`,
        onRemove: () => ({ type: 'priceRange', value: { min: '' }, remove: true }),
      });
    }
    if (filters.priceRange.max) {
      chips.push({
        displayValue: `Max: ₹${filters.priceRange.max}`,
        onRemove: () => ({ type: 'priceRange', value: { max: '' }, remove: true }),
      });
    }
    Object.keys(filters).forEach(filterType => {
      if (filterType !== 'priceSort' && filterType !== 'priceRange' && filters[filterType]?.length > 0) {
        filters[filterType].forEach(value => {
          chips.push({
            displayValue: value,
            onRemove: () => ({ type: filterType, value, remove: true }),
          });
        });
      }
    });
    return chips;
  },
};