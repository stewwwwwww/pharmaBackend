const Contacts = require("../models/contactModel");
const mongoose = require("mongoose");

//GET all Contacts
const getContacts = async (req, res) => {
  const contacts = await Contacts.find({});
  res.status(200).json(contacts);
};

//GET a single Contact
const getContact = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: "Not Found!" });
    }
    const contact = await Contacts.findById(id);
    if (!contact) {
      return res.status(404).json({ err: "Not Found!" });
    }
    res.status(200).json(contact);
  };
  //POST a new Contact
  const createContact = async (req, res) => {
    const { question, answer } = req.body;
    //add doc to db
    try {
      const contact = await Contacts.create({ question, answer });
      res.status(200).json(contact);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };
  //DELETE a Contact
  const deleteContact = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: "Not Found!" });
    }
    const contact = await Contacts.findOneAndDelete({ _id: id });
    if (!contact) {
      return res.status(404).json({ err: "Not Found!" });
    }
    res.status(200).json(contact);
  };
  
  //UPDATE a Contact
  
  const updateContact = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: "Not Found!" });
    }
    const contact = await Contacts.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!contact) {
      return res.status(404).json({ err: "Not Found!" });
    }
    res.status(200).json(contact);
  };

module.exports = {
  createContact,
  getContact,
  getContacts,
  deleteContact,
  updateContact
};
