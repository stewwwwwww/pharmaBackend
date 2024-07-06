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
router.delete("/:categoryId", authenticateToken, deleteCategory);

// DELETE a Category
router.delete("/:categoryId/:productId", authenticateToken, deleteCategory);

// UPDATE a Product
router.patch("/:id", authenticateToken, updateProduct);

module.exports = router;
