"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ordersAPI } from "@/utils/api";
import { Order } from "@/types";
import ReviewForm from "@/components/Forms/ReviewForm";
import {
  CheckCircle,
  Package,
  Truck,
  Star,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const orderId = searchParams?.get("orderId");

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    } else {
      router.push("/shop");
    }
  }, [orderId, router]);

  const fetchOrder = async () => {
    if (!orderId) return;

    setLoading(true);
    try {
      const response = await ordersAPI.getById(orderId);
      // Assert the type of response to access 'order' property safely
      setOrder((response as { order: Order }).order);
    } catch (error) {
      console.error("Error fetching order:", error);
      toast.error("Failed to load order details");
      router.push("/shop");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setShowReviewForm(true);
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    setSelectedProductId("");
    toast.success("Thank you for your review!");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
          <span className="text-gray-600">Loading order details...</span>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Order not found
          </h1>
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. We'll get it delivered to you soon.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Order Details
            </h2>
            <span className="text-sm text-gray-500">
              Order ID: #{order._id.slice(-8).toUpperCase()}
            </span>
          </div>

          {/* Order Status */}
          <div className="flex items-center space-x-4 mb-6 p-4 bg-blue-50 rounded-lg">
            <Package className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Order Confirmed</p>
              <p className="text-sm text-blue-700">
                Your order has been received and is being processed
              </p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Delivery Information
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Name:</strong> {order.customerDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.customerDetails.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.customerDetails.phone}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {`${order.customerDetails.address.street}, ${order.customerDetails.address.city}, ${order.customerDetails.address.state} ${order.customerDetails.address.zipCode}`}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Order Summary
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Payment Method:</strong>{" "}
                  {order.paymentMethod || "Cash on Delivery"}
                </p>
                <p>
                  <strong>Total Amount:</strong>{" "}
                  <span className="font-semibold text-primary-600">
                    {formatPrice(order.totalAmount)}
                  </span>
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="capitalize text-green-600">
                    {order.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Items Ordered</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
        <img
          src={
            Array.isArray(item.images)
              ? item.images[0] || "/placeholder-image.jpg"
              : typeof item.images === "string"
              ? item.images
              : "/placeholder-image.jpg"
          }
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg border"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder-image.jpg";
          }}
        />
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => handleReviewProduct(item.productId)}
                      className="mt-2 inline-flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
                    >
                      <Star className="h-4 w-4" />
                      <span>Write Review</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What happens next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-primary-600">
                  1
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Order Processing</p>
                <p className="text-sm text-gray-600">
                  We're preparing your items for shipment
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-primary-600">
                  2
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">On the Way</p>
                <p className="text-sm text-gray-600">
                  Your order will be dispatched for delivery
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-primary-600">
                  3
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Delivered</p>
                <p className="text-sm text-gray-600">
                  Pay when you receive your order (Cash on Delivery)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-3">
            <Truck className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Free Delivery
            </h3>
          </div>
          <p className="text-gray-700 mb-2">
            Your order will be delivered within 2-3 business days at no extra
            cost.
          </p>
          <p className="text-sm text-gray-600">
            You'll receive an SMS/Email notification when your order is out for
            delivery.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center space-x-2 btn-primary"
          >
            <span>Continue Shopping</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 btn-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-8 p-6 bg-gray-100 rounded-lg">
          <p className="text-gray-600 mb-2">Need help with your order?</p>
          <Link
            href="/contact"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            Contact our support team
          </Link>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && selectedProductId && (
        <ReviewForm
          productId={selectedProductId}
          onClose={() => setShowReviewForm(false)}
          onSubmit={handleReviewSubmitted}
        />
      )}
    </div>
  );
};

export default OrderSuccessPage;
