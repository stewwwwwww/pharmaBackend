const Retailers = require("../models/retailerModel");
const mongoose = require("mongoose");

//GET all Retailers
const getRetailers = async (req, res) => {
  const retailers = await Retailers.find({}).sort({ createAt: -1 });
  res.status(200).json(retailers);
};
//GET a single Retailer
const getRetailer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const retailer = await Retailers.findById(id);
  if (!retailer) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(retailer);
};
//POST a new Retailer
const createRetailer = async (req, res) => {
  const { name, address, location, lat, lng } = req.body;
  //add doc to db
  try {
    const retailer = await Retailers.create({
      name,
      address,
      location,
      lat,
      lng,
    });
    res.status(200).json(retailer);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
//DELETE a Retailer
const deleteRetailer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const retailer = await Retailers.findOneAndDelete({ _id: id });
  if (!retailer) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(retailer);
};

//UPDATE a Retailer

const updateRetailer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const retailer = await Retailers.findOneAndUpdate(
    { _id: id },
    { ...req.body },
  );
  if (!retailer) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(retailer);
};

module.exports = {
  createRetailer,
  getRetailer,
  getRetailers,
  deleteRetailer,
  updateRetailer,
};
