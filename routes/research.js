const express = require("express");
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
router.post("/", createResearch);

//DELETE a Research
router.delete("/:ResearchId", deleteResearch);

//UPDATE a Research
router.patch("/:ResearchId", updateResearch);

module.exports = router;
