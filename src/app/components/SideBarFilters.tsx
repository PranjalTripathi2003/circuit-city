// src/app/components/SideBarFilters.tsx
"use client";

import React, { ChangeEvent } from 'react';

interface SideBarFiltersProps {
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  currentFilters: string[];
  currentSort: string;
}

const SideBarFilters: React.FC<SideBarFiltersProps> = ({ onFilterChange, onSortChange, currentFilters, currentSort }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Filters</h2>
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                value="phones"
                onChange={onFilterChange}
                className="mr-2"
                checked={currentFilters.includes('phones')}
              />
              Phones
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="laptops"
                onChange={onFilterChange}
                className="mr-2"
                checked={currentFilters.includes('laptops')}
              />
              Laptops
            </label>
          </div>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-3">Sort By</h3>
          <select onChange={onSortChange} className="w-full p-2 rounded-lg" value={currentSort}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SideBarFilters;