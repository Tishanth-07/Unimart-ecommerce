"use client";
import React from "react";
import { FiStar } from "react-icons/fi";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = false,
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= rating;
    const isHalfFilled = i - 0.5 <= rating && i > rating;

    stars.push(
      <div key={i} className="relative">
        <FiStar className={`${sizeClasses[size]} text-gray-300`} />
        {(isFilled || isHalfFilled) && (
          <FiStar
            className={`${sizeClasses[size]} text-yellow-400 absolute top-0 left-0`}
            fill="currentColor"
            style={{
              clipPath: isHalfFilled ? "inset(0 50% 0 0)" : "none",
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex space-x-0.5">{stars}</div>
      {showNumber && (
        <span className="text-sm text-gray-600 ml-2">
          {rating.toFixed(1)} ({maxRating})
        </span>
      )}
    </div>
  );
};

export default StarRating;
