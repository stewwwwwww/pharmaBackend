const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  createRetailer,
  getRetailer,
  getRetailers,
  updateRetailer,
  deleteRetailer,
} = require("../controllers/retailerController");
const router = express.Router();

// GET all Retailer
router.get("/", getRetailers);

// GET a single Retailer
router.get("/:id", getRetailer);

// POST a new Retailer
router.post("/", authenticateToken, createRetailer);

// DELETE a Retailer
router.delete("/:id", authenticateToken, deleteRetailer);

// UPDATE a Retailer
router.patch("/:id", authenticateToken, updateRetailer);

module.exports = router;
