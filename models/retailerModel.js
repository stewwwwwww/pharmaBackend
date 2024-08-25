const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const retailerSchema = new Schema(
  {
    name: {
      english: { type: String, required: true, unique: true },
      vietnamese: { type: String, required: true },
    },
    address: {
      english: { type: String, required: true },
      vietnamese: { type: String, required: true },
    },
    location: {
      english: { type: String, required: true },
      vietnamese: { type: String, required: true },
    },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Retailers", retailerSchema);
