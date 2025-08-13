import express from "express";
import {
  createReview,
  getProductReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// Create new review
router.post("/", createReview);

// Get all reviews (for admin)
router.get("/", getAllReviews);

// Get reviews for a specific product
router.get("/product/:productId", getProductReviews);

// Update review status
router.put("/:id/status", updateReviewStatus);

// Delete review
router.delete("/:id", deleteReview);

export default router;
