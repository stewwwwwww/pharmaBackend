const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const faqSchema = new Schema(
  {
    question: {
      english: { type: String, required: true, unique: true },
      vietnamese: { type: String, required: true },
    },
    answer: {
      english: { type: String, require: true },
      vietnamese: { type: String, require: true },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Faqs", faqSchema);
