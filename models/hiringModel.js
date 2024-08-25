const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hiringSchema = new Schema(
  {
    position: {
      english: { type: String, required: true, unique: true },
      vietnamese: { type: String, required: true },
    },
    location: {
      english: { type: String, required: true },
      vietnamese: { type: String, required: true },
    },
    description: {
      english: { type: String, required: true },
      vietnamese: { type: String, required: true },
    },
    insight: {
      english: { type: String, required: true },
      vietnamese: { type: String, required: true },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hirings", hiringSchema);
