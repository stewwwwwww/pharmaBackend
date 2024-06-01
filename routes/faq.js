const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  createFaq,
  getFaq,
  getFaqs,
  updateFaq,
  deleteFaq,
} = require("../controllers/faqController");
const router = express.Router();

// GET all Faq
router.get("/", getFaqs);

// GET a single Faq
router.get("/:id", getFaq);

// POST a new Faq
router.post("/", authenticateToken, createFaq);

// DELETE a Faq
router.delete("/:id", authenticateToken, deleteFaq);

// UPDATE a Faq
router.patch("/:id", authenticateToken, updateFaq);

module.exports = router;
