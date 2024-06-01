const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  createHiring,
  getHiring,
  getHirings,
  updateHiring,
  deleteHiring,
} = require("../controllers/hiringController");
const router = express.Router();

// GET all Hiring
router.get("/", getHirings);

// GET a single Hiring
router.get("/:id", getHiring);

// POST a new Hiring
router.post("/",authenticateToken, createHiring);

// DELETE a Hiring
router.delete("/:id",authenticateToken, deleteHiring);

// UPDATE a Hiring
router.patch("/:id",authenticateToken, updateHiring);

module.exports = router;
