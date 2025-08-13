import express from "express";
import {
  createOrder,
  getOrderByNumber,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Create new order
router.post("/", createOrder);

// Get all orders (for admin)
router.get("/", getAllOrders);

// Get order by order number
router.get("/:orderNumber", getOrderByNumber);

// Update order status
router.put("/:id/status", updateOrderStatus);

export default router;
