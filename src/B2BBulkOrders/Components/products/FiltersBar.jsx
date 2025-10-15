  import React from 'react';
  import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
  import { filterUtils, normalizeColorToCode } from '../../../utils/filterUtils';

  const FilterSidebar = ({
    fromExplore = false,
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

    // const cat = (selectedCategory || '').toLowerCase().replace('_', ' ');
    // const shouldHideSizes = ['SAREE','saree', 'designer saree'].includes(cat);

    const selectedDressTypes = filters.dressType?.map((d) => d.toLowerCase()) || [];

  const sareeTypes = ['saree', 'designer saree'];
  const hasOnlySareeSelected =
    selectedDressTypes.length > 0 &&
    selectedDressTypes.every((type) => sareeTypes.includes(type));

  const shouldHideSizes = hasOnlySareeSelected;
    // Unified option accessor (works for colors and plain strings)
    const getOptionData = (option, filterType) => {
      if (filterType === 'selectedColors') {
        const code = normalizeColorToCode(option);
        const label = typeof option === 'object' && option.name ? option.name : code;
        const hex =
          (typeof option === 'object' && option.hex) ||
          (typeof option === 'string' && option.startsWith('#') ? option : null);
        return {
          value: code,
          label,
          color: hex,
          isColorObject: true,
        };
      }

      const val = typeof option === 'string' ? option : String(option);
      return { value: val, label: val, color: null, isColorObject: false };
    };

    // Selected check
    const isOptionSelected = (filters, filterType, optionValue) => {
      if (!filters[filterType]) return false;
      const normalizedOption =
        filterType === 'selectedColors'
          ? normalizeColorToCode(optionValue)
          : String(optionValue).toLowerCase();

      return filters[filterType].some((sel) => {
        const normalizedSel =
          filterType === 'selectedColors'
            ? normalizeColorToCode(sel)
            : String(sel).toLowerCase();
        return normalizedSel === normalizedOption;
      });
    };

    // Prepare filter groups
    let filterEntries = Object.entries(filterOptions).filter(([key]) => key !== 'priceSort');
    const dressTypeEntry = filterEntries.filter(([key]) => key === 'dressType');
    const otherFilters = filterEntries.filter(([key]) => key !== 'dressType');

    // Helper: render a filter block
    const renderFilterBlock = (filterType, options) => (
      <div key={filterType} className="mb-6">
        <button
          onClick={() => onToggleFilterSection(filterType)}
          className="w-full flex items-center justify-between py-3 border-b border-gray-200"
        >
          <span className="font-medium text-gray-900">{filterType.toUpperCase()}</span>
          {filterSections[filterType] ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {filterSections[filterType] && (
          <div className="py-4">
            <div className="space-y-2 max-h-48 overflow-y-auto overflow-x-scroll scrollbar">
              {options.map((option, index) => {
                const { value, label, color, isColorObject } = getOptionData(option, filterType);
                const optionKey = isColorObject
                  ? `${filterType}-${value}-${index}`
                  : `${filterType}-${value}`;
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
                    <span className="text-xs text-gray-500">({  count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div
        className={`bg-white overflow-y-scroll border rounded-xl border-[#233650] scrollbar ${
          isMobile ? 'p-4 h-full flex flex-col w-3/4' : 'p-6'
        } ${
          !isMobile
            ? 'sticky top-4 max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col'
            : ''
        }`}
      >
        {/* Header */}
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

        {/* Clear All */}
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearAllFilters}
            className="w-full text-sm text-blue-600 hover:text-blue-800 mb-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors flex-shrink-0"
          >
            Clear All Filters
          </button>
        )}

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-scroll scrollbar-none pr-2">

          {/* 🥇 Dress Type first when fromExplore */}
          {fromExplore &&
            dressTypeEntry.map(([filterType, options]) =>
              renderFilterBlock(filterType, options)
            )}

          {/* 🥈 Price Range */}
          <div className="mb-6">
            <button
              onClick={() => onToggleFilterSection('price')}
              className="w-full flex items-center justify-between py-3 border-b border-gray-200"
            >
              <span className="font-medium text-gray-900">PRICE RANGE</span>
              {filterSections.price ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {filterSections.price && (
              <div className="py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by:
                  </label>
                  <select
                    value={filters.priceSort}
                    onChange={(e) => onFilterChange('priceSort', e.target.value)}
                    className="w-full p-2 border border-[#98C0D9] rounded-lg text-sm"
                  >
                    {filterOptions.priceSort.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      placeholder="₹ Min"
                      value={filters.priceRange.min}
                      onChange={(e) =>
                        onFilterChange('priceRange', { min: e.target.value })
                      }
                      className="w-full p-2 border border-[#98C0D9] rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      placeholder="₹ Max"
                      value={filters.priceRange.max}
                      onChange={(e) =>
                        onFilterChange('priceRange', { max: e.target.value })
                      }
                      className="w-full p-2 border border-[#98C0D9] rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 🥉 Remaining filters */}
          {otherFilters
            .filter(([key]) => !(shouldHideSizes && key === 'selectedSizes'))
            .map(([filterType, options]) =>
              renderFilterBlock(filterType, options)
            )}

          {/* 🪄 If not fromExplore, show dressType last */}
          {!fromExplore &&
            dressTypeEntry.map(([filterType, options]) =>
              renderFilterBlock(filterType, options)
            )}
        </div>
      </div>
    );
  };

  export default FilterSidebar;
