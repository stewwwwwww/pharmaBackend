const Orders = require("../models/orderModel");
const mongoose = require("mongoose");

//GET all Orders
const getOrders = async (req, res) => {
  const orders = await Orders.find({});
  res.status(200).json(orders);
};

//GET a single Order
const getOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const order = await Orders.findById(id);
  if (!order) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(order);
};
//POST a new Order
const createOrder = async (req, res) => {
  const { products, orderInfo, shippingAddress, contactInfo, status } = req.body;
  //add doc to db
  try {
    const order = await Orders.create({
      products,
      orderInfo,
      shippingAddress,
      contactInfo,
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
//DELETE a Order
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const order = await Orders.findOneAndDelete({ _id: id });
  if (!order) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(order);
};

//UPDATE a Order

const updateOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const order = await Orders.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!order) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(order);
};

module.exports = {
  createOrder,
  getOrder,
  getOrders,
  deleteOrder,
  updateOrder,
};
