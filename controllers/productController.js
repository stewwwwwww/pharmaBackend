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
  const category = await Products.findOne({
    category: CategoryId.replaceAll("-", " "),
  });
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
//POST a new Categoty
const createCategory = async (req, res) => {
  const { category, categoryDescription, productList } = req.body;
  //add doc to db
  try {
    const product = await Products.create({
      category,
      categoryDescription,
      productList,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
//POST a new Product
const createProduct = async (req, res) => {
  const { name, img, description, highlight, components, price, promotionPrice } = req.body;
  const { CategoryId } = await req.params;

  //add doc to db
  try {
    const product = await Products.updateOne(
      { _id: CategoryId },
      {
        $push: {
          productList: { name, img, description, highlight, components },
        },
      },
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
//DELETE a Category
const deleteCategory = async (req, res) => {
  const { CategoryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(CategoryId)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const category = await Products.findOneAndDelete({ _id: CategoryId });
  if (!category) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(category);
};

//DELETE a single Product
const deleteProduct = async (req, res) => {
  const { CategoryId, ProductId } = req.params;
  if (
    !mongoose.Types.ObjectId.isValid(CategoryId) ||
    !mongoose.Types.ObjectId.isValid(ProductId)
  ) {
    return res.status(404).json({ err: "Ids not valid!" });
  }
  const product = await Products.findOneAndUpdate(
    { _id: req.params.CategoryId },
    { $pull: { productList: { _id: req.params.ProductId } } },
  );
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
  createCategory,
  createProduct,
  getProducts,
  getProduct,
  deleteCategory,
  updateProduct,
  deleteProduct,
};
