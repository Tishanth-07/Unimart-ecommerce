import Review from "../models/Review.js";
import Product from "../models/Product.js";

// Create new review
export const createReview = async (req, res) => {
  try {
    const { productId, customerName, rating, comment, images } = req.body;

    // Validate required fields
    if (!productId || !customerName || !rating || !comment) {
      return res.status(400).json({
        message: "Product ID, customer name, rating, and comment are required",
      });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create review
    const review = new Review({
      productId,
      customerName,
      rating,
      comment,
      images: images || [],
    });

    await review.save();

    // Update product rating
    await updateProductRating(productId);

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Server error while adding review" });
  }
};

// Get reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ productId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Review.countDocuments({ productId });

    // Get rating distribution
    const ratingStats = await Review.aggregate([
      { $match: { productId: mongoose.Types.ObjectId(productId) } },
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
    ]);

    const ratingDistribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    ratingStats.forEach((stat) => {
      ratingDistribution[stat._id] = stat.count;
    });

    res.json({
      reviews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalReviews: total,
      },
      ratingDistribution,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reviews (for admin)
export const getAllReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const reviews = await Review.find()
      .populate("productId", "name images")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Review.countDocuments();

    res.json({
      reviews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalReviews: total,
      },
    });
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update review verification status
export const updateReviewStatus = async (req, res) => {
  try {
    const { verified } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.verified = verified;
    await review.save();

    // Update product rating after verification change
    await updateProductRating(review.productId);

    res.json({ message: "Review status updated successfully", review });
  } catch (error) {
    console.error("Error updating review status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const productId = review.productId;
    await Review.findByIdAndDelete(req.params.id);

    // Update product rating after review deletion
    await updateProductRating(productId);

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Helper function to update product rating
const updateProductRating = async (productId) => {
  try {
    const reviews = await Review.find({ productId });
    const totalReviews = reviews.length;

    if (totalReviews === 0) {
      await Product.findByIdAndUpdate(productId, {
        averageRating: 0,
        totalReviews: 0,
      });
      return;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = Math.round((totalRating / totalReviews) * 10) / 10; // Round to 1 decimal

    await Product.findByIdAndUpdate(productId, {
      averageRating,
      totalReviews,
    });
  } catch (error) {
    console.error("Error updating product rating:", error);
  }
};
