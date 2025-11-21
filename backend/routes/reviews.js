import express from "express";
import multer from "multer";
import path from "path";
import {
  createReview,
  getProductReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `review-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 5 },
});

// Create new review
router.post("/", upload.array("images", 5), createReview);

// Get all reviews (for admin)
router.get("/", getAllReviews);

// Get reviews for a specific product
router.get("/product/:productId", getProductReviews);

// Update review status
router.put("/:id/status", updateReviewStatus);

// Delete review
router.delete("/:id", deleteReview);

export default router;
