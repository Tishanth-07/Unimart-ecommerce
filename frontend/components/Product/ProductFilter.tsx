"use client";

import React, { useState, useEffect } from "react";
import { FilterState } from "@/types";
import { productsAPI } from "@/utils/api";
import { X, ChevronDown, ChevronUp } from "lucide-react";

interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    category: true,
    popularity: true,
  });

  // Price range state
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  // Predefined popularity options
  const popularityOptions = [
    { label: "Trending (100+)", value: "trending" },
    { label: "Popular (50+)", value: "popular" },
    { label: "Featured", value: "featured" },
    { label: "New Products", value: "new" },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setPriceRange(filters.priceRange);
  }, [filters.priceRange]);

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories();
      const data = response as { categories?: string[] };
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceRangeChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;

    // Ensure min is not greater than max
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }

    setPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    onFilterChange({
      ...filters,
      priceRange,
    });
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    onFilterChange({
      ...filters,
      categories: updatedCategories,
    });
  };

  const handlePopularityChange = (popularity: string) => {
    const updatedPopularity = filters.popularity.includes(popularity)
      ? filters.popularity.filter((p) => p !== popularity)
      : [...filters.popularity, popularity];

    onFilterChange({
      ...filters,
      popularity: updatedPopularity,
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.popularity.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 10000;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className={`space-y-6 ${isCollapsed ? "hidden md:block" : ""}`}>
        {/* Price Filter */}
        <div>
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
          >
            <span>Price Range</span>
            {expandedSections.price ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {expandedSections.price && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) =>
                    handlePriceRangeChange(0, parseInt(e.target.value) || 0)
                  }
                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) =>
                    handlePriceRangeChange(1, parseInt(e.target.value) || 10000)
                  }
                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange[0]}
                  onChange={(e) =>
                    handlePriceRangeChange(0, parseInt(e.target.value))
                  }
                  className="range-slider w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    handlePriceRangeChange(1, parseInt(e.target.value))
                  }
                  className="range-slider w-full"
                />
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>

              <button
                onClick={applyPriceFilter}
                className="w-full btn-primary text-sm py-2"
              >
                Apply Price Filter
              </button>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div>
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
          >
            <span>Categories</span>
            {expandedSections.category ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {expandedSections.category && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Popularity Filter */}
        <div>
          <button
            onClick={() => toggleSection("popularity")}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
          >
            <span>Popularity</span>
            {expandedSections.popularity ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {expandedSections.popularity && (
            <div className="space-y-2">
              {popularityOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.popularity.includes(option.value)}
                    onChange={() => handlePopularityChange(option.value)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Active Filters</h3>
            <div className="space-y-2">
              {filters.categories.map((category) => (
                <div
                  key={category}
                  className="inline-flex items-center bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                >
                  <span className="capitalize">{category}</span>
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {filters.popularity.map((popularity) => (
                <div
                  key={popularity}
                  className="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                >
                  <span>
                    {
                      popularityOptions.find((p) => p.value === popularity)
                        ?.label
                    }
                  </span>
                  <button
                    onClick={() => handlePopularityChange(popularity)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) && (
                <div className="inline-flex items-center bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full mr-2 mb-2">
                  <span>
                    {formatPrice(filters.priceRange[0])} -{" "}
                    {formatPrice(filters.priceRange[1])}
                  </span>
                  <button
                    onClick={() =>
                      onFilterChange({
                        ...filters,
                        priceRange: [0, 10000],
                      })
                    }
                    className="ml-2 text-yellow-600 hover:text-yellow-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
