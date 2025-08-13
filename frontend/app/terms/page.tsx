"use client";

import React from "react";
import Link from "next/link";
import { FileText, Calendar, Mail } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-4">
            <FileText className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Terms & Conditions
            </h1>
          </div>
          <div className="flex items-center text-sm text-gray-600 space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Last updated: January 1, 2024</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>
                Questions?{" "}
                <Link
                  href="/contact"
                  className="text-primary-600 hover:text-primary-700"
                >
                  Contact us
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Welcome to Unimart! These Terms and Conditions ("Terms", "Terms
                and Conditions") govern your use of our website operated by
                Unimart ("us", "we", or "our").
              </p>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using our website, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
            </section>

            {/* Definitions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Definitions
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <dl className="space-y-3">
                  <div>
                    <dt className="font-semibold text-gray-900">"Company"</dt>
                    <dd className="text-gray-700">
                      Refers to Unimart, located at 123 Fashion Street, Negombo,
                      Western Province, Sri Lanka.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">"Service"</dt>
                    <dd className="text-gray-700">
                      Refers to the website and e-commerce platform operated by
                      Unimart.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">
                      "User" or "Customer"
                    </dt>
                    <dd className="text-gray-700">
                      Refers to any individual who accesses or uses our service.
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            {/* Use of Service */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Use of Service
              </h2>
              <p className="text-gray-700 mb-4">
                You may use our service for lawful purposes only. You agree not
                to use the service:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>
                  For any unlawful purpose or to solicit others to perform
                  unlawful acts
                </li>
                <li>
                  To violate any international, federal, provincial, or state
                  regulations, rules, laws, or local ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights
                  or the intellectual property rights of others
                </li>
                <li>
                  To harass, abuse, insult, harm, defame, slander, disparage,
                  intimidate, or discriminate
                </li>
                <li>To submit false or misleading information</li>
              </ul>
            </section>

            {/* Products and Orders */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Products and Orders
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Product Information
              </h3>
              <p className="text-gray-700 mb-4">
                We strive to display our products as accurately as possible.
                However, we cannot guarantee that your computer monitor's
                display of colors accurately reflects the color of the products.
                All products are subject to availability.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Order Acceptance
              </h3>
              <p className="text-gray-700 mb-4">
                Your order is an offer to buy a product. All orders are subject
                to acceptance by us. We may, in our sole discretion, refuse or
                cancel any order for any reason.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Pricing
              </h3>
              <p className="text-gray-700 mb-4">
                All prices are displayed in Sri Lankan Rupees (LKR) and include
                applicable taxes. We reserve the right to change prices without
                notice. However, if we change the price of a product you have
                ordered, we will contact you before processing your order.
              </p>
            </section>

            {/* Payment and Delivery */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Payment and Delivery
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Payment Methods
              </h3>
              <p className="text-gray-700 mb-4">
                We currently accept Cash on Delivery (COD) as our primary
                payment method. Payment must be made in full upon delivery of
                your order.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Delivery
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>
                  Free delivery is provided for all orders within our service
                  area
                </li>
                <li>Estimated delivery time is 2-3 business days</li>
                <li>
                  You must be present to receive your order and make payment
                </li>
                <li>
                  If you are not available for delivery, additional delivery
                  charges may apply for redelivery
                </li>
              </ul>
            </section>

            {/* Returns and Exchanges */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Returns and Exchanges
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Return Policy
              </h3>
              <p className="text-gray-700 mb-4">
                You may return items within 7 days of delivery, provided they
                are:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>In original condition with tags attached</li>
                <li>Unused and unwashed</li>
                <li>In original packaging</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Non-Returnable Items
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Intimate apparel and undergarments</li>
                <li>Items damaged by misuse</li>
                <li>Items without original tags or packaging</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-gray-700 mb-4">
                The service and its original content, features, and
                functionality are and will remain the exclusive property of
                Unimart and its licensors. The service is protected by
                copyright, trademark, and other laws. Our trademarks and trade
                dress may not be used in connection with any product or service
                without our prior written consent.
              </p>
            </section>

            {/* Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Privacy
              </h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy
                Policy, which also governs your use of the service, to
                understand our practices.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-gray-700 mb-4">
                In no event shall Unimart, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from your
                use of the service.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Governing Law
              </h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be interpreted and governed by the laws of Sri
                Lanka, without regard to its conflict of law provisions. Our
                failure to enforce any right or provision of these Terms will
                not be considered a waiver of those rights.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Changes to Terms
              </h2>
              <p className="text-gray-700 mb-4">
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days notice prior to any new
                terms taking effect.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Contact Information
              </h2>
              <div className="bg-primary-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms and Conditions,
                  please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Email:</strong> info@unimart.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +94 77 123 4567
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Fashion Street, Negombo,
                    Western Province, Sri Lanka
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4 sm:mb-0">
            <Link
              href="/privacy"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              ← Privacy Policy
            </Link>
          </div>
          <div>
            <Link
              href="/contact"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              Have Questions? Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
