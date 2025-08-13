"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ordersAPI } from "@/utils/api";
import { Loader2, CreditCard, Truck, Shield, Images } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const CheckoutPage = () => {
  const router = useRouter();
  const { state, getCartTotal, clearCart } = useApp();
  const { cart } = state;

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1); // 1: Customer Details, 2: Payment, 3: Review Order

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!customerDetails.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!customerDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customerDetails.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!customerDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(customerDetails.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    // Address validation
    if (!customerDetails.address.street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!customerDetails.address.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!customerDetails.address.state.trim()) {
      newErrors.state = "State/Province is required";
    }

    if (!customerDetails.address.zipCode.trim()) {
      newErrors.zipCode = "ZIP/Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setCustomerDetails((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setCustomerDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    const errorKey = name.startsWith("address.") ? name.split(".")[1] : name;
    if (errors[errorKey]) {
      setErrors((prev) => ({
        ...prev,
        [errorKey]: "",
      }));
    }
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    setLoading(true);
    try {
      // Prepare order data to match API client expectations
      const orderData = {
        items: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.discountedPrice || item.product.price,
        })),
        customerDetails: {
          name: customerDetails.name.trim(),
          email: customerDetails.email.trim(),
          phone: customerDetails.phone.trim(),
          // Convert structured address to single string for API compatibility
          address: `${customerDetails.address.street.trim()}, ${customerDetails.address.city.trim()}, ${customerDetails.address.state.trim()} ${customerDetails.address.zipCode.trim()}`,
        },
        totalAmount: getCartTotal(),
        paymentMethod: "cash_on_delivery",
      };

      console.log("Sending order data:", orderData); // Debug log

      const response = (await ordersAPI.create(orderData)) as any;

      console.log("Order response:", response); // Debug log

      // Clear cart after successful order
      clearCart();

      // Show success message
      toast.success("Order placed successfully!");

      // Redirect to success page with order number or ID
      if (response?.order?.orderNumber) {
        router.push(`/order-success?orderNumber=${response.order.orderNumber}`);
      } else if (response?.order?._id) {
        router.push(`/order-success?orderId=${response.order._id}`);
      } else {
        router.push("/order-success");
      }
    } catch (error: any) {
      console.error("Error placing order:", error);

      // Handle specific error messages from backend
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <button onClick={() => router.push("/shop")} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[
              { step: 1, title: "Customer Details", icon: "👤" },
              { step: 2, title: "Payment Method", icon: "💳" },
              { step: 3, title: "Review Order", icon: "📋" },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                    step >= item.step
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="ml-2 text-sm font-medium text-gray-700">
                  {item.title}
                </div>
                {index < 2 && (
                  <div
                    className={`w-8 h-0.5 mx-4 ${
                      step > item.step ? "bg-primary-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Step 1: Customer Details */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Customer Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerDetails.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customerDetails.phone}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                        placeholder="+94 77 123 4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerDetails.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Address Fields */}
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Delivery Address
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="address.street"
                          value={customerDetails.address.street}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 ${
                            errors.street ? "border-red-500" : ""
                          }`}
                          placeholder="123 Main Street, Apartment 4B"
                        />
                        {errors.street && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.street}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            City *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="address.city"
                            value={customerDetails.address.city}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 ${
                              errors.city ? "border-red-500" : ""
                            }`}
                            placeholder="Colombo"
                          />
                          {errors.city && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.city}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            State/Province *
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="address.state"
                            value={customerDetails.address.state}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 ${
                              errors.state ? "border-red-500" : ""
                            }`}
                            placeholder="Western Province"
                          />
                          {errors.state && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.state}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="md:w-1/2">
                        <label
                          htmlFor="zipCode"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          ZIP/Postal Code *
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="address.zipCode"
                          value={customerDetails.address.zipCode}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 ${
                            errors.zipCode ? "border-red-500" : ""
                          }`}
                          placeholder="10230"
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.zipCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Payment Method
                  </h2>

                  <div className="space-y-4">
                    <div className="border border-primary-200 rounded-lg p-4 bg-primary-50">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="cod"
                          name="payment"
                          value="Cash on Delivery"
                          checked
                          readOnly
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="cod" className="ml-3 flex items-center">
                          <Truck className="h-5 w-5 text-primary-600 mr-2" />
                          <div>
                            <p className="font-medium text-gray-900">
                              Cash on Delivery
                            </p>
                            <p className="text-sm text-gray-600">
                              Pay when you receive your order
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-start">
                        <Shield className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-blue-900 mb-1">
                            Secure Payment
                          </p>
                          <p>
                            Pay safely when your order arrives at your doorstep.
                            No advance payment required.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Review Your Order
                  </h2>

                  {/* Customer Details Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Delivery Information
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Name:</strong> {customerDetails.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {customerDetails.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {customerDetails.phone}
                      </p>
                      <div>
                        <strong>Address:</strong>
                        <div className="ml-4 mt-1">
                          <p>{customerDetails.address.street}</p>
                          <p>
                            {customerDetails.address.city},{" "}
                            {customerDetails.address.state}{" "}
                            {customerDetails.address.zipCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900">Order Items</h3>
                    {cart.map((item) => (
                      <div
                        key={item.product._id}
                        className="flex items-center justify-between py-2 border-b border-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <Image
                            src={`${
                              process.env.NEXT_PUBLIC_API_URL?.replace(
                                "/api",
                                ""
                              ) || "http://localhost:5000"
                            }/uploads/${item.product.images[0]}`}
                            alt={item.product.name}
                            width={100}
                            height={100}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.product.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">
                          {formatPrice(
                            (item.product.discountedPrice ||
                              item.product.price) * item.quantity
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevStep}
                  disabled={step === 1}
                  className="px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Placing Order...</span>
                      </>
                    ) : (
                      <span>Place Order</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({cart.length} items)
                  </span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
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

              {/* Security Features */}
              <div className="mt-6 space-y-2 text-xs text-gray-600">
                <div className="flex items-center">
                  <Shield className="h-3 w-3 mr-2 text-green-500" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-3 w-3 mr-2 text-green-500" />
                  <span>Free delivery</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-3 w-3 mr-2 text-green-500" />
                  <span>Cash on delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
