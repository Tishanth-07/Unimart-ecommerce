import express from "express";
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getPriceRange,
  getCategories,
} from "../controllers/productController.js";

const router = express.Router();

// Get all products with filtering, sorting, and pagination
router.get("/", getProducts);

// Get featured products
router.get("/featured", getFeaturedProducts);

// Get price range for filters
router.get("/price-range", getPriceRange);

// Get all categories
router.get("/categories", getCategories);

// Get single product by ID
router.get("/:id", getProductById);

export default router;
