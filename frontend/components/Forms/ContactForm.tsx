"use client";

import React, { useState } from "react";
import { Loader2, Send } from "lucide-react";

interface ContactFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    message: string;
  }) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    } else if (formData.message.trim().length > 500) {
      newErrors.message = "Message must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      // Reset form on successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          disabled={loading}
          className={`input-field ${
            errors.name ? "border-red-500 focus:ring-red-500" : ""
          } ${loading ? "opacity-50" : ""}`}
          placeholder="Enter your full name"
          maxLength={100}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={loading}
          className={`input-field ${
            errors.email ? "border-red-500 focus:ring-red-500" : ""
          } ${loading ? "opacity-50" : ""}`}
          placeholder="your.email@example.com"
          maxLength={100}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          disabled={loading}
          className={`input-field resize-none ${
            errors.message ? "border-red-500 focus:ring-red-500" : ""
          } ${loading ? "opacity-50" : ""}`}
          placeholder="Tell us about your inquiry, feedback, or any questions you have..."
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.message ? (
            <p className="text-red-500 text-xs">{errors.message}</p>
          ) : (
            <div></div>
          )}
          <p className="text-gray-400 text-xs">{formData.message.length}/500</p>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full btn-primary flex items-center justify-center space-x-2 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>

      {/* Privacy Notice */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <p>
          By submitting this form, you agree to our privacy policy. We'll use
          your information only to respond to your inquiry and won't share it
          with third parties.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
