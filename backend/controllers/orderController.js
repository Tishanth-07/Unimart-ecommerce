const Order = require("../models/Order");
const Product = require("../models/Product");

// Create new order
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
    } = req.body;

    // Calculate total amount and validate products
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${item.product} not found` });
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${product.name}` });
      }

      const itemTotal = product.discountedPrice * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: item.product,
        quantity: item.quantity,
        price: product.discountedPrice,
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items: orderItems,
      totalAmount,
    });

    await order.save();
    await order.populate("items.product");

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get order by ID
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrder,
};
