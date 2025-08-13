"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Target,
  Award,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  Star,
} from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer First",
      description:
        "We put our customers at the center of everything we do, ensuring exceptional service and satisfaction.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Products",
      description:
        "We carefully curate our collection to offer only the highest quality fashion items at affordable prices.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Security",
      description:
        "Your security and privacy are our priority. Shop with confidence knowing your data is protected.",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Reliable Delivery",
      description:
        "Fast, free delivery with cash on delivery option. We ensure your orders reach you safely and on time.",
    },
  ];

  const features = [
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Wide Selection",
      description: "500+ products across multiple fashion categories",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Delivery",
      description: "Complimentary delivery on all orders",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "1000+ Happy Customers",
      description: "Trusted by customers across Sri Lanka",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Cash on Delivery",
      description: "Pay safely when you receive your order",
    },
  ];

  const team = [
    {
      name: "Samantha Silva",
      role: "Founder & CEO",
      description:
        "Fashion industry veteran with 15+ years of experience in retail and customer service.",
    },
    {
      name: "Kasun Perera",
      role: "Head of Operations",
      description:
        "Ensures smooth operations and timely delivery of all orders across the country.",
    },
    {
      name: "Priya Fernando",
      role: "Fashion Curator",
      description:
        "Expert in fashion trends, responsible for selecting the best products for our customers.",
    },
    {
      name: "Nimesh Rathnayake",
      role: "Customer Success",
      description:
        "Dedicated to providing exceptional customer support and ensuring customer satisfaction.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Unimart</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Your trusted fashion destination in Sri Lanka. We're passionate
            about bringing you the latest trends in clothing and accessories
            with exceptional service and unbeatable value.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Founded in 2020 in the beautiful coastal city of Negombo,
                  Unimart began as a small local boutique with a simple mission:
                  to make quality fashion accessible to everyone in Sri Lanka.
                </p>
                <p className="mb-4">
                  What started as a dream to serve our local community has grown
                  into a trusted online fashion destination, serving customers
                  across the Western Province and beyond. We believe that great
                  style shouldn't come with a hefty price tag, and everyone
                  deserves to feel confident in what they wear.
                </p>
                <p>
                  Today, we're proud to offer a carefully curated selection of
                  clothing and accessories, backed by our commitment to quality,
                  affordability, and exceptional customer service.
                </p>
              </div>
            </div>
            <div className="lg:order-first">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg p-8 text-center">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      500+
                    </div>
                    <div className="text-gray-700">Products</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      1000+
                    </div>
                    <div className="text-gray-700">Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      3+
                    </div>
                    <div className="text-gray-700">Years</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      24/7
                    </div>
                    <div className="text-gray-700">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To democratize fashion by providing high-quality, trendy
                clothing and accessories at affordable prices, delivered with
                exceptional customer service and the convenience of cash on
                delivery.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become Sri Lanka's most trusted and beloved online fashion
                retailer, known for our commitment to quality, affordability,
                and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment
              to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Unimart?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're more than just a fashion store. Here's what makes us
              different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Unimart who work tirelessly to bring
              you the best shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 text-center"
              >
                <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Unimart for their
            fashion needs. Discover our latest collection today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="btn-primary bg-primary-600 hover:bg-primary-700"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="btn-secondary bg-white text-gray-900 hover:bg-gray-100"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
