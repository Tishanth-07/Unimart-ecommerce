import Product from "../models/Product.js";
import Review from "../models/Review.js";

// Get all products with filtering, sorting, and pagination
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    let query = {};
    let sortQuery = { createdAt: -1 }; // Default sorting

    // Search functionality
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
        { shortDescription: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Category filter
    if (req.query.category && req.query.category !== "") {
      const categories = req.query.category.split(",");
      query.category = { $in: categories };
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = parseFloat(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        query.price.$lte = parseFloat(req.query.maxPrice);
      }
    }

    // Popularity filter
    if (req.query.popularity && req.query.popularity !== "") {
      const popularityLevels = req.query.popularity.split(",").map((level) => {
        switch (level) {
          case "trending":
            return { popularity: { $gte: 100 } };
          case "popular":
            return { popularity: { $gte: 50 } };
          case "featured":
            return { popularity: { $gte: 25 } };
          case "new":
            return {
              createdAt: {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              },
            };
          default:
            return {};
        }
      });

      if (popularityLevels.length > 0) {
        query.$or = popularityLevels;
      }
    }

    // Sorting
    if (req.query.sort) {
      switch (req.query.sort) {
        case "price_low_high":
          sortQuery = { price: 1 };
          break;
        case "price_high_low":
          sortQuery = { price: -1 };
          break;
        case "rating_high":
          sortQuery = { averageRating: -1 };
          break;
        case "default":
        default:
          sortQuery = { createdAt: -1 };
          break;
      }
    }

    const products = await Product.find(query)
      .sort(sortQuery)
      .limit(limit)
      .skip(skip);

    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Get reviews for this product
    const reviews = await Review.find({ productId: req.params.id }).sort({
      createdAt: -1,
    });

    res.json({
      product,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get featured products for home page
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ popularity: { $gte: 25 } })
      .sort({ popularity: -1 })
      .limit(8);

    res.json(products);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get price range for filters
export const getPriceRange = async (req, res) => {
  try {
    const minPrice = await Product.findOne().sort({ price: 1 }).select("price");
    const maxPrice = await Product.findOne()
      .sort({ price: -1 })
      .select("price");

    res.json({
      minPrice: minPrice?.price || 0,
      maxPrice: maxPrice?.price || 1000,
    });
  } catch (error) {
    console.error("Error fetching price range:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
};
