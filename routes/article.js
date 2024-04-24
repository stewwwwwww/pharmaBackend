const express = require("express");
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
router.post("/", createArticle);

//DELETE a Article
router.delete("/:ArticleId", deleteArticle);

//UPDATE a Article
router.patch("/:ArticleId", updateArticle);

module.exports = router;
