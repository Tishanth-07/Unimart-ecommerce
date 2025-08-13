"use client";

import React from "react";
import Link from "next/link";
import { Shield, Calendar, Mail, Lock, Eye, UserCheck } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <Lock className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      Your Privacy Matters
                    </h3>
                    <p className="text-blue-800">
                      At Unimart, we are committed to protecting your personal
                      information and your right to privacy. This Privacy Policy
                      explains how we collect, use, and safeguard your
                      information when you use our service.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <UserCheck className="h-5 w-5 text-primary-600 mr-2" />
                Personal Information
              </h3>
              <p className="text-gray-700 mb-4">
                We collect personal information that you provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Create an account or place an order</li>
                <li>Contact us for customer support</li>
                <li>Subscribe to our newsletter</li>
                <li>Write product reviews</li>
                <li>Participate in surveys or promotions</li>
              </ul>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  This includes:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <ul className="space-y-1">
                    <li>• Full name</li>
                    <li>• Email address</li>
                    <li>• Phone number</li>
                    <li>• Delivery address</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Order history</li>
                    <li>• Product reviews</li>
                    <li>• Communication preferences</li>
                    <li>• Customer support interactions</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Eye className="h-5 w-5 text-primary-600 mr-2" />
                Automatically Collected Information
              </h3>
              <p className="text-gray-700 mb-4">
                When you visit our website, we automatically collect certain
                information about your device and usage patterns:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website and search terms used</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for the following purposes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Order Processing
                  </h4>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Process and fulfill your orders</li>
                    <li>• Arrange delivery and payment</li>
                    <li>• Send order confirmations and updates</li>
                    <li>• Handle returns and exchanges</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Customer Service
                  </h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Respond to your inquiries</li>
                    <li>• Provide technical support</li>
                    <li>• Resolve disputes and issues</li>
                    <li>• Improve our services</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    Marketing & Communication
                  </h4>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Send promotional offers (with consent)</li>
                    <li>• Newsletter and product updates</li>
                    <li>• Personalized recommendations</li>
                    <li>• Customer feedback requests</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">
                    Website Improvement
                  </h4>
                  <ul className="text-orange-800 text-sm space-y-1">
                    <li>• Analyze website usage patterns</li>
                    <li>• Optimize user experience</li>
                    <li>• Develop new features</li>
                    <li>• Ensure website security</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Information Sharing and Disclosure
              </h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 font-medium">
                  <strong>
                    We do not sell, trade, or rent your personal information to
                    third parties.
                  </strong>
                </p>
              </div>

              <p className="text-gray-700 mb-4">
                We may share your information only in the following limited
                circumstances:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Service Providers
                  </h4>
                  <p className="text-gray-700 text-sm">
                    With trusted third-party service providers who help us
                    operate our business (e.g., delivery partners, payment
                    processors, customer support tools).
                  </p>
                </div>

                <div className="border-l-4 border-primary-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Legal Requirements
                  </h4>
                  <p className="text-gray-700 text-sm">
                    When required by law, legal process, or government request,
                    or to protect our rights, property, or safety.
                  </p>
                </div>

                <div className="border-l-4 border-primary-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Business Transfers
                  </h4>
                  <p className="text-gray-700 text-sm">
                    In connection with a merger, acquisition, or sale of assets,
                    with advance notice to users.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security
                measures to protect your personal information:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-900 mb-1">
                    Encryption
                  </h4>
                  <p className="text-green-800 text-sm">
                    All data transmitted is encrypted using SSL technology
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-blue-900 mb-1">
                    Access Control
                  </h4>
                  <p className="text-blue-800 text-sm">
                    Limited access to authorized personnel only
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <UserCheck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-900 mb-1">
                    Regular Audits
                  </h4>
                  <p className="text-purple-800 text-sm">
                    Regular security assessments and updates
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Your Rights and Choices
              </h2>
              <p className="text-gray-700 mb-4">
                You have the following rights regarding your personal
                information:
              </p>

              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Access:</strong>
                    <span className="text-gray-700">
                      {" "}
                      Request a copy of the personal information we hold about
                      you
                    </span>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Correction:</strong>
                    <span className="text-gray-700">
                      {" "}
                      Request correction of inaccurate or incomplete information
                    </span>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Deletion:</strong>
                    <span className="text-gray-700">
                      {" "}
                      Request deletion of your personal information (subject to
                      legal requirements)
                    </span>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Opt-out:</strong>
                    <span className="text-gray-700">
                      {" "}
                      Unsubscribe from marketing communications at any time
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-lg p-4 mt-4">
                <p className="text-primary-800 text-sm">
                  To exercise any of these rights, please contact us at{" "}
                  <strong>privacy@unimart.com</strong>
                  or use our{" "}
                  <Link href="/contact" className="underline">
                    contact form
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your browsing
                experience:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Essential Cookies
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Necessary for the website to function properly, including
                    shopping cart functionality and security features.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Analytics Cookies
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Help us understand how visitors interact with our website to
                    improve user experience.
                  </p>
                </div>
              </div>

              <p className="text-gray-700">
                You can control cookies through your browser settings, but some
                features may not work properly if cookies are disabled.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Data Retention
              </h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information only for as long as
                necessary to fulfill the purposes outlined in this policy:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>
                  Order information: Retained for 7 years for accounting and
                  legal purposes
                </li>
                <li>
                  Account information: Retained until you request deletion or
                  close your account
                </li>
                <li>
                  Marketing data: Retained until you opt-out or request deletion
                </li>
                <li>
                  Website analytics: Aggregated data retained indefinitely,
                  personal data for 2 years
                </li>
              </ul>
            </section>

            {/* Third-Party Links */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Third-Party Links
              </h2>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices of these external
                sites. We encourage you to review their privacy policies before
                providing any personal information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-gray-700 mb-4">
                Our service is not directed to children under the age of 13. We
                do not knowingly collect personal information from children
                under 13. If you become aware that a child has provided us with
                personal information, please contact us immediately.
              </p>
            </section>

            {/* Updates to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Updates to This Policy
              </h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new policy on
                this page and updating the "Last updated" date. We encourage you
                to review this policy periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Contact Us
              </h2>
              <div className="bg-primary-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Privacy Officer:</strong> privacy@unimart.com
                  </p>
                  <p>
                    <strong>General Contact:</strong> info@unimart.com
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
              href="/terms"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              ← Terms & Conditions
            </Link>
          </div>
          <div>
            <Link
              href="/contact"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              Privacy Questions? Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
