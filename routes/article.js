const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  createArticle,
  getArticles,
  getArticle,
  deleteArticle,
  updateArticle,
} = require("../controllers/articleController");

const router = express.Router();

//GET all Articles
router.get("/", getArticles);

//GET a single Article
router.get("/:ArticleId", getArticle);

//POST a new Article
router.post("/", authenticateToken, createArticle);

//DELETE a Article
router.delete("/:ArticleId", authenticateToken, deleteArticle);

//UPDATE a Article
router.patch("/:ArticleId", authenticateToken, updateArticle);

module.exports = router;
