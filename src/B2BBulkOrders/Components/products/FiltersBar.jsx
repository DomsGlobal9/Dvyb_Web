


import React from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { filterUtils } from '../../../utils/filterUtils';
import { normalizeColorToCode } from '../../../utils/filterUtils';


const FilterSidebar = ({
  selectedCategory,
  filters,
  filterSections,
  filterOptions,
  products,
  activeFiltersCount,
  isMobile = false,
  onFilterChange,
  onToggleFilterSection,
  onClearAllFilters,
  onCloseMobile,
}) => {
  // Helper function to get option value and label
 // inside FilterSidebar.jsx
 console.log("cat",selectedCategory,25)
 
const cat = (selectedCategory || '').toLowerCase().replace('_', ' ');
const shouldHideSizes = ['saree', 'designer saree'].includes(cat);

// Unified option accessor (works for colors and plain strings)
const getOptionData = (option, filterType) => {
  if (filterType === 'selectedColors') {
     console.log("filterType",filterType,25)
    // expected shape: {code, name, hex}; but also tolerate {name, hex} or strings
    const code = normalizeColorToCode(option);
    const label = typeof option === 'object' && option.name ? option.name : code;
    const hex =
      (typeof option === 'object' && option.hex) ||
      (typeof option === 'string' && option.startsWith('#') ? option : null);
    return {
      value: code,     // canonical comparable value
      label,
      color: hex,
      isColorObject: true
    };
  }


  // default path for non-color filters
  const val = typeof option === 'string' ? option : String(option);
  return { value: val, label: val, color: null, isColorObject: false };
};

// Selected check with normalization
const isOptionSelected = (filters, filterType, optionValue) => {
  if (!filters[filterType]) return false;
  // normalize all selected values and compare to normalized optionValue
  const normalizedOption = filterType === 'selectedColors'
    ? normalizeColorToCode(optionValue)
    : String(optionValue).toLowerCase();

  return filters[filterType].some(sel => {
    const normalizedSel = filterType === 'selectedColors'
      ? normalizeColorToCode(sel)
      : String(sel).toLowerCase();
    return normalizedSel === normalizedOption;
  });
};


  return (
    <div className={`bg-white overflow-y-scroll scrollbar ${isMobile ? 'p-4 h-full flex flex-col w-3/4' : 'p-6'} ${!isMobile ? 'sticky top-4 max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col' : ''}`}>
      {/* Header - Fixed */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          FILTER
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </h3>
        {isMobile && (
          <button
            onClick={onCloseMobile}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Clear All Button - Fixed */}
      {activeFiltersCount > 0 && (
        <button
          onClick={onClearAllFilters}
          className="w-full text-sm text-blue-600 hover:text-blue-800 mb-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors flex-shrink-0"
        >
          Clear All Filters
        </button>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-scroll scrollbar-none pr-2">
        {/* Price Range Section */}
        <div className="mb-6">
          <button
            onClick={() => onToggleFilterSection('price')}
            className="w-full flex items-center justify-between py-3 border-b border-gray-200"
          >
            <span className="font-medium text-gray-900">PRICE RANGE</span>
            {filterSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {filterSections.price && (
            <div className="py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by:</label>
                <select
                  value={filters.priceSort}
                  onChange={(e) => onFilterChange('priceSort', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                >
                  {filterOptions.priceSort.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                  <input
                    type="number"
                    placeholder="₹ Min"
                    value={filters.priceRange.min}
                    onChange={(e) => onFilterChange('priceRange', { min: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                  <input
                    type="number"
                    placeholder="₹ Max"
                    value={filters.priceRange.max}
                    onChange={(e) => onFilterChange('priceRange', { max: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Other Filter Sections */}
        {Object.entries(filterOptions).filter(([key]) => key !== 'priceSort').filter(([key]) => !(shouldHideSizes && key === 'selectedSizes')).map(([filterType, options]) => (
          <div key={filterType} className="mb-6">
            <button
              onClick={() => onToggleFilterSection(filterType)}
              className="w-full flex items-center justify-between py-3 border-b border-gray-200"
            >
              <span className="font-medium text-gray-900">{filterType.toUpperCase()}</span>
              {filterSections[filterType] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {filterSections[filterType] && (
              <div className="py-4">
                <div className="space-y-2 max-h-48 overflow-y-auto overflow-y-scroll scrollbar">
                  {options.map((option, index) => {
                    const { value, label, color, isColorObject } = getOptionData(option, filterType);
                    
                    // Create unique key for each option
                    const optionKey = isColorObject ? `${filterType}-${value}-${index}` : `${filterType}-${value}`;
                    
                    // Get count for this option (use value for counting)
                    const count = filterUtils.getFilterCount(products, filterType, value);
                    const isSelected = isOptionSelected(filters, filterType, value);

                    return (
                      <label
                        key={optionKey}
                        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onFilterChange(filterType, value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          
                          {/* Special rendering for colors with swatch */}
                          {isColorObject ? (
                            <div className="ml-3 flex items-center space-x-2">
                              <div
                                className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                                style={{ backgroundColor: color }}
                                title={label}
                              />
                              <span className="text-sm text-gray-700 capitalize">{label}</span>
                            </div>
                          ) : (
                            <span className="ml-3 text-sm text-gray-700">{label}</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;