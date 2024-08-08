const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    products: [
      {
        name: { type: String, required: true },
        productPrice: { type: Number, required: true },
        productPromotionPrice: { type: Number },
        productSubtotal: { type: Number, required: true },
        productTotal: { type: Number, required: true },
        productQuantity: { type: Number, required: true },
      },
    ],
    orderInfo: {
      orderSubtotal: { type: Number, required: true },
      orderTotal: { type: Number, required: true },
      orderQuantity: { type: Number, required: true },
    },
    shippingAddress: {
      streetAddress: { type: String, required: true },
      ward: { type: String },
      district: { type: String, required: true },
      city: { type: String, required: true },
    },
    contactInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String },
      note: { type: String },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
