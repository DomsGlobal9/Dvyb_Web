// context/FilterContext.js
import React, { createContext, useContext, useState } from 'react';

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

  return (
    <FilterContext.Provider value={{ selectedCategory, setSelectedCategory, filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);