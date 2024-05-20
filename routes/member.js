const express = require("express");
const {
  createMember,
  getMember,
  getMembers,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");
const router = express.Router();

// GET all Member
router.get("/", getMembers);

// GET a single Member
router.get("/:id", getMember);

// POST a new Member
router.post("/", createMember);

// DELETE a Member
router.delete("/:id", deleteMember);

// UPDATE a Member
router.patch("/:id", updateMember);

module.exports = router;
