"use client";

import React, { useState } from "react";
import { reviewsAPI } from "@/utils/api";
import StarRating from "@/components/Common/StarRating";
import { X, Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface ReviewFormProps {
  productId: string;
  onClose: () => void;
  onSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    customerName: "",
    rating: 0,
    comment: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }

    if (formData.rating === 0) {
      newErrors.rating = "Rating is required";
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "Review comment is required";
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = "Review must be at least 10 characters long";
    }

    if (images.length > 5) {
      newErrors.images = "Maximum 5 images allowed";
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

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));

    if (errors.rating) {
      setErrors((prev) => ({
        ...prev,
        rating: "",
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit

      if (!isImage) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }

      if (!isValidSize) {
        toast.error(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }

      return true;
    });

    if (images.length + validFiles.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...validFiles]);

    if (errors.images) {
      setErrors((prev) => ({
        ...prev,
        images: "",
      }));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await reviewsAPI.create({
        productId,
        customerName: formData.customerName.trim(),
        rating: formData.rating,
        comment: formData.comment.trim(),
        images: images.length > 0 ? images : undefined,
      });

      onSubmit();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal content */}
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Write a Review
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Name */}
            <div>
              <label
                htmlFor="customerName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name *
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className={`input-field ${
                  errors.customerName ? "border-red-500" : ""
                }`}
                placeholder="Enter your name"
              />
              {errors.customerName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.customerName}
                </p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              <div className="flex items-center space-x-2">
                <StarRating
                  rating={formData.rating}
                  size="lg"
                  interactive
                  onRatingChange={handleRatingChange}
                />
                <span className="text-sm text-gray-600">
                  {formData.rating > 0 && `${formData.rating} out of 5`}
                </span>
              </div>
              {errors.rating && (
                <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Review *
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                value={formData.comment}
                onChange={handleInputChange}
                className={`input-field resize-none ${
                  errors.comment ? "border-red-500" : ""
                }`}
                placeholder="Share your experience with this product..."
              />
              <div className="flex justify-between items-center mt-1">
                {errors.comment && (
                  <p className="text-red-500 text-xs">{errors.comment}</p>
                )}
                <p className="text-gray-400 text-xs ml-auto">
                  {formData.comment.length}/500
                </p>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Photos (Optional)
              </label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="review-images"
                />
                <label
                  htmlFor="review-images"
                  className="flex items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload images
                    </p>
                    <p className="text-xs text-gray-400">
                      Max 5 images, 5MB each
                    </p>
                  </div>
                </label>

                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition-colors duration-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {errors.images && (
                  <p className="text-red-500 text-xs">{errors.images}</p>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 btn-secondary disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
