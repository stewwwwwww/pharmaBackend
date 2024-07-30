const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  createContact,
  getContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

// GET all Contact
router.get("/", getContacts);

// GET a single Contact
router.get("/:id", getContact);

// POST a new Contact
router.post("/", authenticateToken, createContact);

// DELETE a Contact
router.delete("/:id", authenticateToken, deleteContact);

// UPDATE a Contact
router.patch("/:id", authenticateToken, updateContact);

module.exports = router;
