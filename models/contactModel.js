const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema(

  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    message: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Contact", contactSchema);
