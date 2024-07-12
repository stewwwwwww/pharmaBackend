const Researchs = require("../models/researchModel");
const mongoose = require("mongoose");

//GET all Researchs
const getResearchs = async (req, res) => {
  const researchs = await Researchs.find({});
  res.status(200).json(researchs);
};

//GET a single Research
const getResearch = async (req, res) => {
  const research = await Researchs.findOne({ name: req.params.ResearchId.replaceAll("-", " ") });
  if (!research) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(research);
};

//POST a new Research
const createResearch = async (req, res) => {
  const { name, description, highlight, img, components } = req.body;
  //add doc to db
  try {
    const research = await Researchs.create({
      name,
      description,
      highlight,
      img,
      components,
    });
    res.status(200).json(research);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
//DELETE a Research
const deleteResearch = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const research = await Researchs.findOneAndDelete({ _id: id });
  if (!research) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(research);
};

//UPDATE a Research
const updateResearch = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const research = await Researchs.findOneAndUpdate(
    { _id: id },
    { ...req.body },
  );
  if (!research) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(research);
};

module.exports = {
  createResearch,
  getResearchs,
  getResearch,
  deleteResearch,
  updateResearch,
};
