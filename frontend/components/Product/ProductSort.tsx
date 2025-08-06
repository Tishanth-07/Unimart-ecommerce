"use client";
import React from "react";

interface ProductSortProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const ProductSort: React.FC<ProductSortProps> = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: "default", label: "Default Sorting" },
    { value: "price_low_high", label: "Price: Low to High" },
    { value: "price_high_low", label: "Price: High to Low" },
    { value: "rating_high", label: "Highest Rated" },
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700 font-medium">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSort;
