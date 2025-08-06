"use client";
import React from "react";
import { PaginationInfo } from "@/types";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const { currentPage, totalPages, hasPrev, hasNext } = pagination;

  const generatePageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-1">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className={`flex items-center px-3 py-2 rounded-md ${
          hasPrev
            ? "text-gray-700 hover:bg-gray-100"
            : "text-gray-400 cursor-not-allowed"
        }`}
      >
        <FiChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </button>

      {/* Page Numbers */}
      {generatePageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-3 py-2 rounded-md ${
            page === currentPage
              ? "bg-primary-600 text-white"
              : page === "..."
              ? "text-gray-400 cursor-default"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`flex items-center px-3 py-2 rounded-md ${
          hasNext
            ? "text-gray-700 hover:bg-gray-100"
            : "text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
        <FiChevronRight className="h-4 w-4 ml-1" />
      </button>
    </div>
  );
};

export default Pagination;
