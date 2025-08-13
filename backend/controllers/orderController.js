import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `UNI${timestamp.slice(-6)}${random}`;
};

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { customerDetails, items } = req.body;

    // Validate required fields
    if (!customerDetails || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Customer details and items are required" });
    }

    // Validate customer details
    const requiredFields = ["name", "email", "phone", "address"];
    for (const field of requiredFields) {
      if (!customerDetails[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // Validate address fields
    const addressFields = ["street", "city", "state", "zipCode"];
    for (const field of addressFields) {
      if (!customerDetails.address[field]) {
        return res
          .status(400)
          .json({ message: `Address ${field} is required` });
      }
    }

    // Calculate total amount and validate items
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}`,
        });
      }

      const itemPrice = product.discountPrice || product.price;
      totalAmount += itemPrice * item.quantity;

      validatedItems.push({
        productId: product._id,
        name: product.name,
        price: itemPrice,
        quantity: item.quantity,
        image: product.images[0],
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Create order
    const order = new Order({
      orderNumber: generateOrderNumber(),
      customerDetails,
      items: validatedItems,
      totalAmount,
    });

    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: {
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error while placing order" });
  }
};

// Get order by order number
export const getOrderByNumber = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderNumber: req.params.orderNumber,
    }).populate("items.productId", "name images");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders (for admin)
export const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate("items.productId", "name images");

    const total = await Order.countDocuments();

    res.json({
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
