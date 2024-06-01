const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  createResearch,
  getResearchs,
  getResearch,
  deleteResearch,
  updateResearch,
} = require("../controllers/researchController");

const router = express.Router();

//GET all Researchs
router.get("/", getResearchs);

//GET a single Research
router.get("/:ResearchId", getResearch);

//POST a new Research
router.post("/", authenticateToken, createResearch);

//DELETE a Research
router.delete("/:ResearchId", authenticateToken, deleteResearch);

//UPDATE a Research
router.patch("/:ResearchId", authenticateToken, updateResearch);

module.exports = router;
