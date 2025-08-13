"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import { useApp } from "@/context/AppContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useApp();
  const { product, quantity } = item;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem();
      return;
    }

    if (newQuantity > product.stock) {
      toast.error("Not enough stock available");
      return;
    }

    updateQuantity(product._id, newQuantity);
  };

  const handleRemoveItem = () => {
    removeFromCart(product._id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  const itemPrice = product.discountedPrice || product.price;
  const totalPrice = itemPrice * quantity;

  return (
    <div className="p-6 flex items-start space-x-4">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Link href={`/product/${product._id}`}>
          <Image
            src={`${
              process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
              "http://localhost:5000"
            }/uploads/${product.images[0]}`}
            alt={product.name}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-lg border hover:opacity-75 transition-opacity duration-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-image.jpg";
            }}
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link
              href={`/product/${product._id}`}
              className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors duration-200 block"
            >
              <h3 className="line-clamp-2">{product.name}</h3>
            </Link>

            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {product.shortDescription}
            </p>

            <div className="mt-2">
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mt-2">
              {product.stock > 0 ? (
                <span className="text-sm text-green-600">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-sm text-red-600">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemoveItem}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 ml-4"
            title="Remove from cart"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Price and Quantity Controls */}
        <div className="mt-4 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Qty:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>

              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value) || 1;
                  handleQuantityChange(newQuantity);
                }}
                min="1"
                max={product.stock}
                className="w-16 py-1 text-center border-0 focus:ring-0 text-sm font-medium"
              />

              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
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

            {quantity > 1 && (
              <div className="text-sm text-gray-600 mt-1">
                Total:{" "}
                <span className="font-semibold">{formatPrice(totalPrice)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
