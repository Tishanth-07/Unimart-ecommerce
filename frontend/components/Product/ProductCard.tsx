"use client";
import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import StarRating from "@/components/Common/StarRating";
import { useCart } from "@/context/CartContext";
import { FiShoppingCart } from "react-icons/fi";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <Link href={`/product/${product._id}`}>
        <div className="relative">
          <img
            src={product.images[0] || "/placeholder-image.jpg"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{product.discount}%
            </div>
          )}
          <button
            onClick={handleAddToCart}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary-50"
          >
            <FiShoppingCart className="h-5 w-5 text-primary-600" />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Rating */}
          {product.averageRating > 0 && (
            <div className="flex items-center mb-2">
              <StarRating rating={product.averageRating} size="sm" />
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary-600">
              ${product.discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-2">
            {product.stock > 0 ? (
              <span className="text-xs text-green-600">In Stock</span>
            ) : (
              <span className="text-xs text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
