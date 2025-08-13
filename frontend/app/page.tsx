"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Truck, Shield, Headphones, Star } from "lucide-react";
import Slider from "@/components/Common/Slider";

const HomePage = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Delivery",
      description: "Cash on delivery available for all orders",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Shopping",
      description: "Your information is safe and secure with us",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Customer support available round the clock",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Quality Products",
      description: "Only the best quality products for our customers",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Banner Slider */}
      <Slider />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-primary-600">Unimart</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover the latest fashion trends with our curated collection of
              clothing and accessories. Quality products at affordable prices.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Unimart?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience
              and quality products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our wide range of fashion products and find your perfect
            style. Free delivery and cash on delivery available.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            <span>Browse Products</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                1000+
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                50+
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
