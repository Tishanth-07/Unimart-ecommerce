const Product = require("../models/Product");

// Get all products with filters, sorting, and pagination
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = {};

    // Search filter
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
        { category: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Category filter
    if (req.query.category) {
      const categories = req.query.category.split(",");
      filter.category = { $in: categories };
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      filter.discountedPrice = {};
      if (req.query.minPrice)
        filter.discountedPrice.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice)
        filter.discountedPrice.$lte = parseFloat(req.query.maxPrice);
    }

    // Popularity filter
    if (req.query.popularity) {
      const popularityLevels = req.query.popularity.split(",");
      const popularityRanges = popularityLevels.map((level) => {
        switch (level) {
          case "high":
            return { $gte: 80 };
          case "medium":
            return { $gte: 40, $lt: 80 };
          case "low":
            return { $lt: 40 };
          default:
            return {};
        }
      });
      if (popularityRanges.length > 0) {
        filter.$or = popularityRanges.map((range) => ({ popularity: range }));
      }
    }

    // Build sort object
    let sort = {};
    switch (req.query.sortBy) {
      case "price_low_high":
        sort.discountedPrice = 1;
        break;
      case "price_high_low":
        sort.discountedPrice = -1;
        break;
      case "rating_high":
        sort.averageRating = -1;
        break;
      default:
        sort.createdAt = -1; // Default: newest first
    }

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product (for admin)
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
};
