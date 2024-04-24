const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController")


const router = express.Router();

// GET all Products
router.get("/", getProducts);

// GET a single Product
router.get("/:CategoryId/:ProductId", getProduct);

// POST a new Product
router.post("/", createProduct);

// DELETE a Product
router.delete("/:id", deleteProduct);

// UPDATE a Product
router.patch("/:id", updateProduct);

module.exports = router;
