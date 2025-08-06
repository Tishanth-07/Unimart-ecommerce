"use client";
import React, { useState, useEffect } from "react";
import { FilterOptions } from "@/types";

interface ProductFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange);
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = ["Men", "Women", "Kids", "Accessories", "Footwear"];
  const popularityOptions = [
    { value: "high", label: "High (80+)" },
    { value: "medium", label: "Medium (40-80)" },
    { value: "low", label: "Low (0-40)" },
  ];

  const handleCategoryChange = (category: string) => {
    const updatedCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter((c) => c !== category)
      : [...localFilters.categories, category];

    const updatedFilters = { ...localFilters, categories: updatedCategories };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePopularityChange = (popularity: string) => {
    const updatedPopularity = localFilters.popularity.includes(popularity)
      ? localFilters.popularity.filter((p) => p !== popularity)
      : [...localFilters.popularity, popularity];

    const updatedFilters = { ...localFilters, popularity: updatedPopularity };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePriceFilter = () => {
    const updatedFilters = { ...localFilters, priceRange };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      categories: [],
      priceRange: { min: 0, max: 1000 },
      popularity: [],
    };
    setLocalFilters(clearedFilters);
    setPriceRange({ min: 0, max: 1000 });
    onClearFilters();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Min Price
            </label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: parseInt(e.target.value) })
              }
              className="w-full"
            />
            <span className="text-sm text-gray-600">${priceRange.min}</span>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Max Price
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
              }
              className="w-full"
            />
            <span className="text-sm text-gray-600">${priceRange.max}</span>
          </div>
          <button
            onClick={handlePriceFilter}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
          >
            Apply Price Filter
          </button>
        </div>
      </div>

      {/* Popularity Filter */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 mb-3">Popularity</h4>
        <div className="space-y-2">
          {popularityOptions.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.popularity.includes(option.value)}
                onChange={() => handlePopularityChange(option.value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
