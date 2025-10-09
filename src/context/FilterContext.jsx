// context/FilterContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { productService } from '../services/firebaseServices';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [filters, setFilters] = useState({
    priceSort: '',
    priceRange: { min: '', max: '' },
    category: [],
    selectedColors: [],
    selectedSizes: [],
    fabric: [],
    craft: [],
    dressType: [],
  });

  // Add allProducts state
  const [allProducts, setAllProducts] = useState([]);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.fetchAllProducts();
        setAllProducts(products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        filters,
        setFilters,
        allProducts, // expose products
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
