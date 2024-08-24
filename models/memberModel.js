const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    description: {
      english: { type: String, required: true },
      vietnamese: { type: String, required: true },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Members", memberSchema);
