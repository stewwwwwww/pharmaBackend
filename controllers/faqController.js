const Faqs = require("../models/faqModel");
const mongoose = require("mongoose");

//GET all Faqs
const getFaqs = async (req, res) => {
  const faqs = await Faqs.find({});
  res.status(200).json(faqs);
};

//GET a single Faq
const getFaq = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const faq = await Faqs.findById(id);
  if (!faq) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(faq);
};
//POST a new Faq
const createFaq = async (req, res) => {
  const { question, answer } = req.body;
  //add doc to db
  try {
    const faq = await Faqs.create({ question, answer });
    res.status(200).json(faq);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
//DELETE a Faq
const deleteFaq = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const faq = await Faqs.findOneAndDelete({ _id: id });
  if (!faq) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(faq);
};

//UPDATE a Faq

const updateFaq = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const faq = await Faqs.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!faq) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(faq);
};

module.exports = {
  createFaq,
  getFaq,
  getFaqs,
  deleteFaq,
  updateFaq,
};
