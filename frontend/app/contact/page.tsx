"use client";

import React, { useState } from "react";
import { contactAPI } from "@/utils/api";
import ContactForm from "@/components/Forms/ContactForm";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = async (formData: {
    name: string;
    email: string;
    message: string;
  }) => {
    try {
      await contactAPI.create(formData);
      setFormSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: "info@unimart.com",
      subDetails: "support@unimart.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: "+94 77 123 4567",
      subDetails: "+94 11 234 5678",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      details: "123 Fashion Street",
      subDetails: "Negombo, Western Province, Sri Lanka",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM",
      subDetails: "Sat - Sun: 10:00 AM - 4:00 PM",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: "https://facebook.com/unimart",
      color: "text-blue-600 hover:text-blue-700",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: "https://twitter.com/unimart",
      color: "text-sky-500 hover:text-sky-600",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://instagram.com/unimart",
      color: "text-pink-600 hover:text-pink-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with our team for any
            questions, support, or feedback about your shopping experience.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600">
                Have questions about our products, orders, or services? We're
                here to help! Reach out to us through any of the channels below.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                      {info.icon}
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">
                      {info.title}
                    </h3>
                  </div>
                  <div className="text-gray-600">
                    <p className="font-medium">{info.details}</p>
                    <p className="text-sm">{info.subDetails}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Follow Us
              </h3>
              <p className="text-gray-600 mb-4">
                Stay connected with us on social media for the latest updates,
                promotions, and fashion trends.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-200 transition-colors duration-200 ${social.color}`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Customer Support
              </h3>
              <p className="text-blue-800 text-sm mb-3">
                Our dedicated support team is available to assist you with:
              </p>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Order tracking and delivery information</li>
                <li>• Product inquiries and recommendations</li>
                <li>• Returns and exchange requests</li>
                <li>• Technical support and account issues</li>
                <li>• General questions about our services</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <ContactForm onSubmit={handleFormSubmit} />
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How long does delivery take?
              </h3>
              <p className="text-gray-600">
                We offer free delivery within 2-3 business days for all orders.
                You'll receive tracking information via SMS/email once your
                order is dispatched.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Do you accept returns?
              </h3>
              <p className="text-gray-600">
                Yes, we accept returns within 7 days of delivery for unused
                items in original condition. Contact our support team to
                initiate a return request.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                Currently, we accept Cash on Delivery (COD) for all orders. Pay
                conveniently when your order arrives at your doorstep.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How can I track my order?
              </h3>
              <p className="text-gray-600">
                You'll receive order confirmation and tracking details via email
                and SMS. You can also contact our support team with your order
                ID for updates.
              </p>
            </div>
          </div>
        </div>

        {/* Map Section (Placeholder) */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Visit Our Store
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p className="font-medium">Store Location Map</p>
                <p className="text-sm">
                  123 Fashion Street, Negombo, Western Province
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
