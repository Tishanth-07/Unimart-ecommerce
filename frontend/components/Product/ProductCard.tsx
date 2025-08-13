"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { useApp } from "@/context/AppContext";
import StarRating from "@/components/Common/StarRating";
import { ShoppingCart, Eye } from "lucide-react";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock > 0) {
      addToCart(product, 1);
    } else {
      toast.error("Product is out of stock");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  const discountPercentage = product.discount
    ? Math.round((product.discount / product.price) * 100)
    : 0;

  return (
    <div className="card group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="aspect-w-4 aspect-h-5 bg-gray-200">
          <Image
            src={`${
              process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
              "http://localhost:5000"
            }/uploads/${product.images[0]}`}
            alt={product.name}
            width={400}
            height={500}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-image.jpg";
            }}
          />
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercentage}%
          </div>
        )}

        {/* Stock Status */}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <Link
            href={`/product/${product._id}`}
            className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            title="View Details"
          >
            <Eye className="h-5 w-5" />
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            title={product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Rating */}
        {product.totalReviews > 0 && (
          <div className="flex items-center mb-3">
            <StarRating rating={product.averageRating} size="sm" />
            <span className="text-sm text-gray-500 ml-2">
              ({product.totalReviews} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.discountedPrice ? (
              <>
                <span className="text-lg font-bold text-primary-600">
                  {formatPrice(product.discountedPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Stock Info */}
          <div className="text-sm text-gray-500">
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock ({product.stock})</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="mt-3">
          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
