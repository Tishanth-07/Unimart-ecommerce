"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Product, Review } from "@/types";
import { productsAPI, reviewsAPI } from "@/utils/api";
import { useApp } from "@/context/AppContext";
import StarRating from "@/components/Common/StarRating";
import ReviewForm from "@/components/Forms/ReviewForm";
import {
  ShoppingCart,
  Heart,
  Share2,
  Minus,
  Plus,
  Loader2,
  Star,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const productId = params?.id as string;

  useEffect(() => {
    if (productId) {
      fetchProduct();
      fetchReviews();
    }
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getById(productId);
      const typedResponse = response as { product: Product };
      setProduct(typedResponse.product);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
      router.push("/shop");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const response = await reviewsAPI.getByProductId(productId);
      const typedResponse = response as { reviews?: Review[] };
      setReviews(typedResponse.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock < quantity) {
      toast.error("Not enough stock available");
      return;
    }

    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (!product) return;

    if (product.stock < quantity) {
      toast.error("Not enough stock available");
      return;
    }

    addToCart(product, quantity);
    router.push("/cart");
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (product && newQuantity > product.stock) {
      toast.error("Not enough stock available");
      return;
    }
    setQuantity(newQuantity);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    fetchReviews();
    fetchProduct(); // Refresh product to update average rating
    toast.success("Review submitted successfully!");
  };

  const discountPercentage = product?.discount
    ? Math.round((product.discount / product.price) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        <span className="ml-2 text-gray-600">Loading product...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <button onClick={() => router.push("/shop")} className="btn-primary">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden shadow-sm border">
              <Image
                src={`${
                  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
                  "http://localhost:5000"
                }/uploads/${product.images[0]}`}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-image.jpg";
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                      selectedImage === index
                        ? "border-primary-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={`${
                        process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
                        "http://localhost:5000"
                      }/uploads/${product.images[0]}`}
                      alt={`${product.name} ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-20 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {product.shortDescription}
              </p>

              {/* Rating */}
              {product.totalReviews > 0 && (
                <div className="flex items-center mb-4">
                  <StarRating rating={product.averageRating} size="md" />
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.totalReviews} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              {product.discountedPrice ? (
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-primary-600">
                    {formatPrice(product.discountedPrice)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded-full">
                    -{discountPercentage}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Category */}
            <div>
              <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full capitalize">
                {product.category}
              </span>
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="font-medium text-gray-900">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-outline flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            )}

            {/* Additional Actions */}
            <div className="flex items-center space-x-4 pt-4 border-t">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors duration-200">
                <Heart className="h-5 w-5" />
                <span>Add to Wishlist</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "description", label: "Description" },
                { id: "reviews", label: `Reviews (${reviews.length})` },
                { id: "specifications", label: "Specifications" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="btn-primary"
                  >
                    Write a Review
                  </button>
                </div>

                {reviewsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
                  </div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div
                        key={review._id}
                        className="border-b border-gray-200 pb-6 last:border-b-0"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-gray-900">
                                {review.customerName}
                              </h4>
                              <StarRating rating={review.rating} size="sm" />
                              <span className="text-sm text-gray-500">
                                {new Date(
                                  review.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-3">
                              {review.comment}
                            </p>
                            {review.images && review.images.length > 0 && (
                              <div className="flex space-x-2">
                                {review.images.map((image, index) => (
                                  <Image
                                    key={index}
                                    src={image}
                                    alt={`Review image ${index + 1}`}
                                    width={80}
                                    height={80}
                                    className="w-20 h-20 object-cover rounded-lg border"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      No reviews yet. Be the first to review this product!
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Product Details
                  </h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Category:</dt>
                      <dd className="font-medium capitalize">
                        {product.category}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Stock:</dt>
                      <dd className="font-medium">{product.stock} units</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Popularity Score:</dt>
                      <dd className="font-medium">{product.popularity}/100</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Added:</dt>
                      <dd className="font-medium">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Pricing</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Original Price:</dt>
                      <dd className="font-medium">
                        {formatPrice(product.price)}
                      </dd>
                    </div>
                    {product.discount && (
                      <>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Discount:</dt>
                          <dd className="font-medium text-red-600">
                            -{formatPrice(product.discount)}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Final Price:</dt>
                          <dd className="font-medium text-primary-600">
                            {formatPrice(product.discountedPrice!)}
                          </dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          productId={product._id}
          onClose={() => setShowReviewForm(false)}
          onSubmit={handleReviewSubmitted}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
