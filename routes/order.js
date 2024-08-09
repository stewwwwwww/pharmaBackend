const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const rateLimit = require("../middleware/limitRate");

const {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

// GET all Order
router.get("/", getOrders);

// GET a single Order
router.get("/:id", getOrder);

// POST a new Order
router.post("/",rateLimit, createOrder);

// DELETE a Order
router.delete("/:id", authenticateToken, deleteOrder);

// UPDATE a Order
router.patch("/:id", authenticateToken, updateOrder);

module.exports = router;
