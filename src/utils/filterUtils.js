import { COLORS } from '../constants/colors';


// already exporting COLORS and normalizeColorToCode in your file
const getProductColorCodes = (product) => {
  // Try common fields that might exist in your data
  const raw =
    product.selectedColors ??
    product.color ??
    product.colors ??
    product.colour;

  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(normalizeColorToCode).filter(Boolean);
  return [normalizeColorToCode(raw)].filter(Boolean);
};


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

// Convert anything ("red", "red_#FF0000", "#FF0000", {code,name,hex}) to a canonical color code (e.g. "red")
export const normalizeColorToCode = (val) => {
  if (!val) return '';
  if (typeof val === 'object') {
    // option object {code,name,hex} or {name, hex}
    if (val.code) return String(val.code).toLowerCase();
    if (val.name) return String(val.name).toLowerCase(); // fallback if no code
  }
  if (typeof val === 'string') {
    const s = val.trim();
    // legacy "red_#FF0000"
    if (s.includes('_')) return s.split('_')[0].toLowerCase();
    // if hex only, map hex -> code if possible
    if (s.startsWith('#')) return hexToCode(s);
    // plain code
    return s.toLowerCase();
  }
  return '';
};

// optional: map hex to code using your COLORS table (in case product stores hex only)
const hexToCode = (hex) => {
  const clean = (hex || '').toUpperCase();
  const match = (COLORS || []).find(c => (c.value || '').toUpperCase() === clean);
  return match ? match.code.toLowerCase() : clean.toLowerCase(); // fallback to hex as key
};


export const FILTER_OPTIONS = {
  priceSort: ['Low to High', 'High to Low'],
  category: ['WOMEN'],
     selectedColors: COLORS.map(c => ({ code: c.code, name: c.name, hex: c.value })),
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

  // (your category + search code unchanged)

  // Sort and price range (unchanged)
  Object.keys(filters).forEach(filterType => {
    if (filterType === 'priceSort' && filters.priceSort) {
      filtered = filtered.sort((a, b) => {
        const priceA = parseFloat(a.price) || 0;
        const priceB = parseFloat(b.price) || 0;
        return filters.priceSort === 'Low to High' ? priceA - priceB : priceB - priceA;
      });
      return;
    }

    if (filterType === 'priceRange') {
      const { min, max } = filters.priceRange;
      if (min) filtered = filtered.filter(p => (parseFloat(p.price) || 0) >= parseFloat(min));
      if (max) filtered = filtered.filter(p => (parseFloat(p.price) || 0) <= parseFloat(max));
      return;
    }

    // ✅ Special handling for colors
    if (filterType === 'selectedColors' && (filters.selectedColors?.length || 0) > 0) {
      const want = filters.selectedColors.map(normalizeColorToCode);
      filtered = filtered.filter(p => {
        const have = getProductColorCodes(p); // ["red","blue",...]
        return want.some(c => have.includes(c));
      });
      return;
    }

    // Generic multi-selects (sizes, fabric, craft, etc.)
    if (filters[filterType]?.length > 0) {
      filtered = filtered.filter(product => {
        const field = product[filterType];
        if (!field) return false;
        if (Array.isArray(field)) {
          return filters[filterType].some(v => field.includes(v));
        }
        return filters[filterType].includes(field);
      });
    }
  });

  return filtered;
},




  getFilterCount(products, filterType, filterValue) {
  // ✅ Colors
  if (filterType === 'selectedColors') {
    const want = normalizeColorToCode(filterValue);
    return products.reduce((acc, p) => {
      const have = getProductColorCodes(p);
      return acc + (have.includes(want) ? 1 : 0);
    }, 0);
  }

  // Category count (your custom mapping)
  if (filterType === 'category') {
    return products.filter(p => p.dressType === filterValue).length;
  }

  // Generic fields
  return products.filter(product => {
    if (Array.isArray(product[filterType])) {
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
  // ... your existing code above
  Object.keys(filters).forEach(filterType => {
    if (filterType !== 'priceSort' && filterType !== 'priceRange' && filters[filterType]?.length > 0) {
      filters[filterType].forEach(value => {
        let display = value;
        if (filterType === 'selectedColors') {
          const hit = COLORS.find(c => c.code.toLowerCase() === String(value).toLowerCase());
          display = hit ? hit.name : value;
        }
        chips.push({
          displayValue: display,
          onRemove: () => ({ type: filterType, value, remove: true }),
        });
      });
    }
  });
  return chips;
},

};