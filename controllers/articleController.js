const Articles = require("../models/articleModel");
const mongoose = require("mongoose");

//GET all Articles
const getArticles = async (req, res) => {
  const articles = await Articles.find({}).sort({ createAt: -1 });
  res.status(200).json(articles);
};

//GET a single Article
const getArticle = async (req, res) => {
  const article = await Articles.findOne({ name: req.params.ArticleId.replaceAll("-", " ") });
  if (!article) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(article);
};

//POST a new Article
const createArticle = async (req, res) => {
  const { name, description, highlight, img, components } = req.body;
  //add doc to db
  try {
    const article = await Articles.create({
      name,
      description,
      highlight,
      img,
      components,
    });
    res.status(200).json(article);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
//DELETE a Article
const deleteArticle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const article = await Articles.findOneAndDelete({ _id: id });
  if (!article) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(article);
};

//UPDATE a Article
const updateArticle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const article = await Articles.findOneAndUpdate(
    { _id: id },
    { ...req.body },
  );
  if (!article) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(article);
};

module.exports = {
  createArticle,
  getArticles,
  getArticle,
  deleteArticle,
  updateArticle,
};
