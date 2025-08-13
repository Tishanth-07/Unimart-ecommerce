"use client";

import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = "md",
  showText = false,
  interactive = false,
  onRatingChange,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleStarClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < maxRating; i++) {
      const isFilled = i < Math.floor(rating);
      const isHalfFilled = i === Math.floor(rating) && rating % 1 !== 0;

      stars.push(
        <div key={i} className="relative">
          <Star
            className={`${sizeClasses[size]} ${
              interactive ? "cursor-pointer" : ""
            } text-gray-300`}
            onClick={() => handleStarClick(i)}
          />
          <Star
            className={`${sizeClasses[size]} absolute top-0 left-0 ${
              interactive ? "cursor-pointer" : ""
            } ${
              isFilled || isHalfFilled ? "text-yellow-400" : "text-transparent"
            } fill-current transition-colors duration-200`}
            style={{
              clipPath: isHalfFilled ? "inset(0 50% 0 0)" : "none",
            }}
            onClick={() => handleStarClick(i)}
          />
        </div>
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center space-x-1">{renderStars()}</div>
      {showText && (
        <span className="text-sm text-gray-600 ml-2">
          {rating.toFixed(1)} out of {maxRating}
        </span>
      )}
    </div>
  );
};

export default StarRating;
