const Products = require("../models/productModel");
const mongoose = require("mongoose");

//GET all Products
const getProducts = async (req, res) => {
  const products = await Products.find({});
  res.status(200).json(products);
};

//GET a single Product
const getProduct = async (req, res) => {
  const { CategoryId, ProductId } = await req.params;
  const category = await Products.findOne({
    "category.english": CategoryId.replaceAll("-", " "),
  });
  // If category does not exist or has no productList
  if (!category || !category.productList) {
    return res.status(404).json({ err: "Not Found!  2" });
  }
  // Find the product in the productList array
  const product = category.productList.find(
    (product) => product.name.english === ProductId.replaceAll("-", " "),
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
  const {
    name,
    img,
    description,
    highlight,
    promotionPrice,
    price,
    components,
  } = req.body;
  const { CategoryId } = await req.params;

  //add doc to db
  try {
    const product = await Products.updateOne(
      { _id: CategoryId },
      {
        $push: {
          productList: {
            name,
            img,
            description,
            highlight,
            price,
            promotionPrice,
            components,
          },
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
  const { CategoryId, ProductId } = req.params;

  // Validate the provided IDs
  if (
    !mongoose.Types.ObjectId.isValid(CategoryId) ||
    !mongoose.Types.ObjectId.isValid(ProductId)
  ) {
    return res.status(404).json({ err: "Ids not valid!" });
  }

  try {
    // Find the category by ID and then locate the product within that category
    const category = await Product.findOne({ _id: CategoryId });

    if (!category) {
      return res.status(404).json({ err: "Category Not Found!" });
    }

    // Find the product within the productList array by ProductId
    const product = category.productList.id(ProductId);

    if (!product) {
      return res.status(404).json({ err: "Product Not Found!" });
    }

    // Update the product fields with the new data from req.body
    Object.assign(product, req.body);

    // Save the updated category document
    await category.save();

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ err: "Server Error!" });
  }
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
