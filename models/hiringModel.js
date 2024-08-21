const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hiringSchema = new Schema(
  {
    position: { type: String, require: true, unique: true },
    location: { type: String, require: true },
    description: { type: String, require: true },
    insight: { type: String, require: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hirings", hiringSchema);
