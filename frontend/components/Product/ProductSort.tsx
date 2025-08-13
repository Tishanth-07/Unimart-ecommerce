"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface ProductSortProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const ProductSort: React.FC<ProductSortProps> = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { label: "Default Sorting", value: "default" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Highest Rated", value: "rating_desc" },
    { label: "Most Popular", value: "popularity_desc" },
    { label: "Newest First", value: "newest" },
    { label: "Name: A to Z", value: "name_asc" },
    { label: "Name: Z to A", value: "name_desc" },
  ];

  const currentOption =
    sortOptions.find((option) => option.value === sortBy) || sortOptions[0];

  return (
    <div className="relative">
      <label htmlFor="sort-select" className="sr-only">
        Sort products
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
    </div>
  );
};

export default ProductSort;
