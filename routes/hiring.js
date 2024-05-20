const express = require("express");
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
router.post("/", createHiring);

// DELETE a Hiring
router.delete("/:id", deleteHiring);

// UPDATE a Hiring
router.patch("/:id", updateHiring);

module.exports = router;
