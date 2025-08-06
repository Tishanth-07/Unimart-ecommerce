const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    discountedPrice: {
      type: Number,
      default: function () {
        return this.price - (this.price * this.discount) / 100;
      },
    },
    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids", "Accessories", "Footwear"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    popularity: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate discounted price before saving
productSchema.pre("save", function (next) {
  if (this.discount > 0) {
    this.discountedPrice = this.price - (this.price * this.discount) / 100;
  } else {
    this.discountedPrice = this.price;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
