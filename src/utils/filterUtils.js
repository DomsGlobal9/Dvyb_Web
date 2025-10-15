// filterUtils.js - FIXED VERSION

import { COLORS } from '../constants/colors';

const getProductColorCodes = (product) => {
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

// Map curated collection titles to product categories
const CATEGORY_MAPPING = {
  'SAREES & BLOUSES': ['SAREE','saree', 'BLOUSES'],
  'ETHNIC COLLECTION': ['SAREE','SALWAR SUITS', 'LEHENGAS', 'ANARKALI', 'DUPATTAS'],
  'PREMIUM FABRICS': ['SILK DRESS', 'DESIGNER SAREE', 'Cotton', 'Silk', 'Silk Cotton', 'Georgette', 'Chiffon', 'Net',
    'Velvet', 'Crepe', 'Khadi', 'Tissue', 'Pure Linen', 'Kota',
    'Viscose', 'Mulmul', 'Organza',],
  'LUXURY ACCESSORIES': ['DUPATTAS', 'ETHNIC JACKET'],
};
// Map navbar categories to their dress type variations
const NAVBAR_TO_DRESS_TYPE = {
  'SAREE': ['Saree', 'Designer Saree'],
  'SALWAR SUITS': ['Salwar Suits', 'Salwar Suit'],
  'LEHENGAS': ['Lehenga', 'Lehenga'],
  'ANARKALI': ['Anarkali'],
  'DUPATTAS': ['Dupatta', 'Dupattas'],
  'ETHNIC JACKET': ['Ethnic Jacket'],
  'BLOUSES': ['Blouse', 'Blouses'],
  'TROUSERS': ['Trouser', 'Trousers'],
  'SKIRTS': ['Skirt', 'Skirts'],
};
export const normalizeColorToCode = (val) => {
  if (!val) return '';
  if (typeof val === 'object') {
    if (val.code) return String(val.code).toLowerCase();
    if (val.name) return String(val.name).toLowerCase();
  }
  if (typeof val === 'string') {
    const s = val.trim();
    if (s.includes('_')) return s.split('_')[0].toLowerCase();
    if (s.startsWith('#')) return hexToCode(s);
    return s.toLowerCase();
  }
  return '';
};

const hexToCode = (hex) => {
  const clean = (hex || '').toUpperCase();
  const match = (COLORS || []).find(c => (c.value || '').toUpperCase() === clean);
  return match ? match.code.toLowerCase() : clean.toLowerCase();
};




export const normalizeCategory = (str) =>
  String(str || '').trim().toLowerCase().replace(/\s+/g, '');


export const FILTER_OPTIONS = {
  dressType: [
    'Lehenga', 'SAREE', 'Cotton Kurti', 'Silk Dress',
    'Party Wear', 'Casual Wear', 'Wedding Wear', 'Formal Wear',
  ],
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

    // 1. CATEGORY FILTER (from navigation or sidebar)
  // 1. CATEGORY FILTER (from navigation)
// if (selectedCategory && selectedCategory !== 'ALL') {
//   const cat = selectedCategory.toUpperCase().trim();
  
//   filtered = filtered.filter(product => {
//     const productType = (product.dressType || '').trim();
    
//      if (CATEGORY_MAPPING[cat]) {
//       return CATEGORY_MAPPING[cat].some(match =>
//         productType.toLowerCase().includes(match.toLowerCase())
//       );
//     }
//     // Check if navbar category maps to specific dress types
//     if (NAVBAR_TO_DRESS_TYPE[cat]) {
//       return NAVBAR_TO_DRESS_TYPE[cat].some(dressType => 
//         productType.toLowerCase() === dressType.toLowerCase()
//       );
//     }
    
//     // Fallback: partial match
//     return productType.toUpperCase().includes(cat);
//   });
// }

if (selectedCategory && selectedCategory.toUpperCase() !== 'ALL') {
  const catNorm = normalizeCategory(selectedCategory);

  filtered = filtered.filter(product => {
    const productType = normalizeCategory(product.dressType);
    const productCat = normalizeCategory(product.category);

    // Check NAVBAR_TO_DRESS_TYPE
    for (const key in NAVBAR_TO_DRESS_TYPE) {
      if (normalizeCategory(key) === catNorm) {
        return NAVBAR_TO_DRESS_TYPE[key].some(d => normalizeCategory(d) === productType);
      }
    }

    // Check CATEGORY_MAPPING
    for (const key in CATEGORY_MAPPING) {
      if (CATEGORY_MAPPING[key].some(d => normalizeCategory(d) === productType)) {
        return true;
      }
    }

    // Fallback: partial match
    return productType.includes(catNorm) || productCat.includes(catNorm);
  });
}

    // 2. SEARCH TERM FILTER
    if (searchTerm && searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product => {
        return (
          product.productName?.toLowerCase().includes(search) ||
          product.description?.toLowerCase().includes(search) ||
          product.dressType?.toLowerCase().includes(search) ||
          product.fabric?.toLowerCase().includes(search)
        );
      });
    }

    // 3. APPLY ALL OTHER FILTERS
    Object.keys(filters).forEach(filterType => {
      // Price sort
      if (filterType === 'priceSort' && filters.priceSort) {
        filtered = filtered.sort((a, b) => {
          const priceA = parseFloat(a.price) || 0;
          const priceB = parseFloat(b.price) || 0;
          return filters.priceSort === 'Low to High' ? priceA - priceB : priceB - priceA;
        });
        return;
      }

      // Price range
      if (filterType === 'priceRange') {
        const { min, max } = filters.priceRange;
        if (min) filtered = filtered.filter(p => (parseFloat(p.price) || 0) >= parseFloat(min));
        if (max) filtered = filtered.filter(p => (parseFloat(p.price) || 0) <= parseFloat(max));
        return;
      }

      // Color filter (special handling)
      if (filterType === 'selectedColors' && (filters.selectedColors?.length || 0) > 0) {
        const want = filters.selectedColors.map(normalizeColorToCode);
        filtered = filtered.filter(p => {
          const have = getProductColorCodes(p);
          return want.some(c => have.includes(c));
        });
        return;
      }

      // Generic multi-selects (sizes, fabric, craft, dressType, etc.)
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
  if (filterType === "selectedColors") {
    const want = normalizeColorToCode(filterValue);
    return products.reduce((acc, p) => {
      const have = getProductColorCodes(p);
      return acc + (have.includes(want) ? 1 : 0);
    }, 0);
  }

  // ✅ Category count fix for curated section
  if (filterType === "category") {
    const target = String(filterValue).toLowerCase();
    return products.filter(p => {
      const dress = (p.dressType || "").toLowerCase();
      const cat = (p.category || "").toLowerCase();
      const title = (p.title || p.name || "").toLowerCase();

      // Match if any relevant field includes the target
      return (
        dress.includes(target) ||
        cat.includes(target) ||
        title.includes(target)
      );
    }).length;
  }

  // Generic fields fallback
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
    
    // Category chip
    if (selectedCategory !== 'ALL') {
      chips.push({
        displayValue: selectedCategory,
        onRemove: () => ({ type: 'category', value: 'ALL', remove: true }),
      });
    }

    // Other filter chips
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