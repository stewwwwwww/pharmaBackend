const express = require("express");
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
router.post("/", createCategory);

//Post a new Product
router.post("/:CategoryId", createProduct);

// DELETE a Category
router.delete("/:CategoryId", deleteCategory);

// DELETE a Product
router.delete("/:CategoryId/:ProductId", deleteProduct);

// UPDATE a Product
router.patch("/:id", updateProduct);

module.exports = router;
