const Review = require("../models/Review");
const Product = require("../models/Product");

// Create review
const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    // Update product rating
    await updateProductRating(review.product);

    res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product average rating
const updateProductRating = async (productId) => {
  try {
    const reviews = await Review.find({ product: productId });
    const totalReviews = reviews.length;

    if (totalReviews > 0) {
      const averageRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

      await Product.findByIdAndUpdate(productId, {
        averageRating: Math.round(averageRating * 10) / 10,
        reviewCount: totalReviews,
      });
    }
  } catch (error) {
    console.error("Error updating product rating:", error);
  }
};

module.exports = {
  createReview,
  getProductReviews,
};
