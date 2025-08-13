"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import CartItem from "@/components/Cart/CartItem";
import { ShoppingBag, ArrowLeft } from "lucide-react";

const CartPage = () => {
  const { state, getCartTotal, clearCart } = useApp();
  const { cart } = state;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 btn-primary"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cart Items ({cart.length})
                  </h2>
                  {cart.length > 1 && (
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({cart.length} items)
                  </span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/checkout"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>
              </div>

              {/* Payment Method Info */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Cash on Delivery</strong> available for all orders
                </p>
              </div>

              {/* Continue Shopping */}
              <div className="mt-4">
                <Link
                  href="/shop"
                  className="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                  <span>Browse More Products</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed or Recommended Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You might also like
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center text-gray-500">
              <p>
                Recommended products will be shown here based on your cart
                items.
              </p>
              <Link
                href="/shop"
                className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Explore our products →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
