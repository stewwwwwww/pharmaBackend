const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  createCategory,
  createProduct,
  getProducts,
  getProduct,
  deleteCategory,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const router = express.Router();

// GET all Products
router.get("/", getProducts);

// GET a single Product
router.get("/:CategoryId/:ProductId", getProduct);

// POST a new Category
router.post("/", authenticateToken, createCategory);

//Post a new Category
router.post("/:CategoryId", authenticateToken, createProduct);

// DELETE a Category
router.delete("/:CategoryId", authenticateToken, deleteCategory);

// DELETE a Product
router.delete("/:CategoryId/:ProductId", authenticateToken, deleteProduct);

// UPDATE a Product
router.patch("/:id", authenticateToken, updateProduct);

module.exports = router;
