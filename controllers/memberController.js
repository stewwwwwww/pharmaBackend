const Members = require("../models/memberModel");
const mongoose = require("mongoose");

//GET all Members
const getMembers = async (req, res) => {
  const members = await Members.find({});
  res.status(200).json(members);
};

//GET a single Member
const getMember = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: "Not Found!" });
    }
    const member = await Members.findById(id);
    if (!member) {
      return res.status(404).json({ err: "Not Found!" });
    }
    res.status(200).json(member);
  };
  //POST a new Member
  const createMember = async (req, res) => {
    const { name, img, description } = req.body;
    //add doc to db
    try {
      const member = await Members.create({ name, img, description });
      res.status(200).json(member);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };
  //DELETE a Member
  const deleteMember = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: "Not Found!" });
    }
    const member = await Members.findOneAndDelete({ _id: id });
    if (!member) {
      return res.status(404).json({ err: "Not Found!" });
    }
    res.status(200).json(member);
  };
  
  //UPDATE a Member
  
  const updateMember = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: "Not Found!" });
    }
    const member = await Members.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!member) {
      return res.status(404).json({ err: "Not Found!" });
    }
    res.status(200).json(member);
  };

module.exports = {
  createMember,
  getMember,
  getMembers,
  deleteMember,
  updateMember
};
