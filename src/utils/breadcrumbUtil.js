// utils/breadcrumbUtil.js - FIXED VERSION WITH SECTION

// Map product categories to their parent sections
const CATEGORY_TO_SECTION = {
  'SAREE': 'ETHNIC WEAR',
  'SALWAR SUITS': 'ETHNIC WEAR',
  'LEHENGAS': 'ETHNIC WEAR',
  'ANARKALI': 'ETHNIC WEAR',
  'DUPATTAS': 'ETHNIC WEAR',
  'ETHNIC JACKET': 'ETHNIC WEAR',
  'BLOUSES': 'TOP WEAR',
  'T-SHIRTS': 'TOP WEAR',
  'SHIRTS': 'TOP WEAR',
  'TROUSERS': 'BOTTOM WEAR',
  'SKIRTS': 'BOTTOM WEAR',
  'JEANS': 'BOTTOM WEAR',
};

export const getProductBreadcrumbs = (product, navCategory = null) => {
  const category = 'WOMEN'; // Always Women for now
  
  let subcategory = '';
  let section = '';
  
  // Priority 1: Use navCategory if provided (most accurate - from URL)
  if (navCategory) {
    subcategory = navCategory;
    section = CATEGORY_TO_SECTION[navCategory] || '';
  }
  // Priority 2: Use product's stored subcategory
  else if (product.subCategory || product.subcategory) {
    subcategory = product.subCategory || product.subcategory;
    section = CATEGORY_TO_SECTION[subcategory] || '';
  }
  // Priority 3: Infer from product title/dressType
  else {
    const lowerTitle = (product.title || product.name || '').toLowerCase();
    const dressType = (product.dressType || '').toUpperCase();
    
    // Check against known mappings
    for (const [key, sectionName] of Object.entries(CATEGORY_TO_SECTION)) {
      if (lowerTitle.includes(key.toLowerCase()) || dressType === key) {
        subcategory = key;
        section = sectionName;
        break;
      }
    }
    
    // Fallback
    if (!subcategory) {
      if (lowerTitle.includes('saree')) {
        subcategory = 'SAREE';
        section = 'ETHNIC WEAR';
      }
      else if (lowerTitle.includes('salwar') || lowerTitle.includes('suit')) {
        subcategory = 'SALWAR SUITS';
        section = 'ETHNIC WEAR';
      }
      else if (lowerTitle.includes('lehenga')) {
        subcategory = 'LEHENGAS';
        section = 'ETHNIC WEAR';
      }
      else if (lowerTitle.includes('trouser')) {
        subcategory = 'TROUSERS';
        section = 'BOTTOM WEAR';
      }
      else if (lowerTitle.includes('skirt')) {
        subcategory = 'SKIRTS';
        section = 'BOTTOM WEAR';
      }
      else if (lowerTitle.includes('blouse')) {
        subcategory = 'BLOUSES';
        section = 'TOP WEAR';
      }
      else {
        subcategory = 'ETHNIC WEAR';
        section = 'ETHNIC WEAR';
      }
    }
  }

  return {
    category,
    section,        // NEW: Section like "ETHNIC WEAR", "BOTTOM WEAR"
    subcategory,    // Product type like "TROUSERS", "SAREE"
    productName: product.title || product.name || 'Product'
  };
};