const express = require("express");
const rateLimit = require("../middleware/limitRate");
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
router.post("/", rateLimit, createContact);

// DELETE a Contact
router.delete("/:id", deleteContact);

// UPDATE a Contact
router.patch("/:id", updateContact);

module.exports = router;
