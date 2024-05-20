const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const retailerSchema = new Schema(
  {
    name: { type: String, require: true },
    address: { type: String, require: true },
    location: { type: String, require: true },
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Retailers", retailerSchema);
