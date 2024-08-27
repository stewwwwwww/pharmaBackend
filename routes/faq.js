const express = require("express");
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
router.post("/", createFaq);

// DELETE a Faq
router.delete("/:id", deleteFaq);

// UPDATE a Faq
router.patch("/:id", updateFaq);

module.exports = router;
