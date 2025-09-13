import React from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { filterUtils } from '../../../utils/filterUtils';

const FilterSidebar = ({
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
  return (
    <div className={`bg-white ${isMobile ? 'p-4' : 'p-6'} ${!isMobile ? 'sticky top-4' : ''}`}>
      <div className="flex items-center justify-between mb-6">
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
      {activeFiltersCount > 0 && (
        <button
          onClick={onClearAllFilters}
          className="w-full text-sm text-blue-600 hover:text-blue-800 mb-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
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
      {Object.entries(filterOptions).filter(([key]) => key !== 'priceSort').map(([filterType, options]) => (
        <div key={filterType} className="mb-6">
          <button
            onClick={() => onToggleFilterSection(filterType)}
            className="w-full flex items-center justify-between py-3 border-b border-gray-200"
          >
            <span className="font-medium text-gray-900">{filterType.toUpperCase()}</span>
            {filterSections[filterType] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {filterSections[filterType] && (
            <div className="py-4 space-y-2 max-h-64 overflow-y-auto">
              {options.map((option) => {
                const count = filterUtils.getFilterCount(products, filterType, option);
                const isSelected = filters[filterType]?.includes(option);
                return (
                  <label
                    key={option}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onFilterChange(filterType, option)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{option}</span>
                    </div>
                    <span className="text-xs text-gray-500">({count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;