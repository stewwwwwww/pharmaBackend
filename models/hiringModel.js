const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hiringSchema = new Schema(
  {
    position: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    insight: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hirings", hiringSchema);
