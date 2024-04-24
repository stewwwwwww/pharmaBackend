const Products = require("../models/productModel");
const mongoose = require("mongoose");

//GET all Products
const getProducts = async (req, res) => {
  const products = await Products.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

//GET a single Product
const getProduct = async (req, res) => {
  const { CategoryId, ProductId } = await req.params;
  const category = await Products.findOne({ productCategory: CategoryId.replaceAll("-", " ") });
  // If category does not exist or has no productList
  if (!category || !category.productList) {
    return res.status(404).json({ err: "Not Found!  2" });
  }
  // Find the product in the productList array
  const product = category.productList.find(
    (product) => product.name === ProductId.replaceAll("-", " "),
  );
  // If product is not found
  if (!product) {
    return res.status(404).json({ err: "Not Found! 3" });
  }
  // Return the found product
  res.status(200).json(product);
};
//POST a new Product
const createProduct = async (req, res) => {
  const { productCategory, categoryDescription, productList } = req.body;
  //add doc to db
  try {
    const product = await Products.create({
      productCategory,
      categoryDescription,
      productList,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
//DELETE a Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const product = await Products.findOneAndDelete({ _id: id });
  if (!product) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(product);
};

//UPDATE a Product

const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const product = await Products.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!product) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(product);
};
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
