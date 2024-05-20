const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    name: { type: String, require: true },
    img: { type: String, require: true },
    description: { type: String, require: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Members", memberSchema);
