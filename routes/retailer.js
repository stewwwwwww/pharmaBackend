const express = require("express");
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
router.post("/", createRetailer);

// DELETE a Retailer
router.delete("/:id", deleteRetailer);

// UPDATE a Retailer
router.patch("/:id", updateRetailer);

module.exports = router;
