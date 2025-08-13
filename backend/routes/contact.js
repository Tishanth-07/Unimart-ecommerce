import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

// Create new contact message
router.post("/", createContact);

// Get all contact messages (for admin)
router.get("/", getAllContacts);

// Get contact by ID
router.get("/:id", getContactById);

// Update contact status
router.put("/:id/status", updateContactStatus);

// Delete contact message
router.delete("/:id", deleteContact);

export default router;
