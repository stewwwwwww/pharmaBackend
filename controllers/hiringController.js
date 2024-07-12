const Hirings = require("../models/hiringModel");
const mongoose = require("mongoose");

//GET all Hirings
const getHirings = async (req, res) => {
  const hirings = await Hirings.find({});
  res.status(200).json(hirings);
};

//GET a single Hiring
const getHiring = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const hiring = await Hirings.findById(id);
  if (!hiring) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(hiring);
};
//POST a new Hiring
const createHiring = async (req, res) => {
  const { position, location, description, insight } = req.body;
  //add doc to db
  try {
    const hiring = await Hirings.create({
      position,
      location,
      description,
      insight,
    });
    res.status(200).json(hiring);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
//DELETE a Hiring
const deleteHiring = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const hiring = await Hirings.findOneAndDelete({ _id: id });
  if (!hiring) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(hiring);
};

//UPDATE a Hiring

const updateHiring = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const hiring = await Hirings.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!hiring) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(hiring);
};

module.exports = {
  createHiring,
  getHiring,
  getHirings,
  deleteHiring,
  updateHiring,
};
