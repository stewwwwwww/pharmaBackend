const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
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
router.post("/",authenticateToken, createMember);

// DELETE a Member
router.delete("/:id",authenticateToken, deleteMember);

// UPDATE a Member
router.patch("/:id",authenticateToken, updateMember);

module.exports = router;
