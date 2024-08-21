const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const retailerSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Retailers", retailerSchema);
