const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    category: {
      english: {
        type: String,
        required: true,
        unique: true,
      },
      vietnamese: {
        type: String,
        required: true,
      },
    },
    categoryDescription: {
      english: {
        type: String,
        required: true,
      },
      vietnamese: {
        type: String,
        required: true,
      },
    },
    productList: [
      {
        name: {
          english: { type: String, required: true, unique: true },
          vietnamese: { type: String, required: true },
        },
        description: {
          english: { type: String, required: true },
          vietnamese: { type: String, required: true },
        },
        highlight: {
          english: { type: String, required: true },
          vietnamese: { type: String, required: true },
        },
        img: { type: String, required: true },
        //TYPES: header, description, paragraph, point, image, linebreak
        //CONTENT for header, desription, paragraph, point: text String
        //CONTENT for image: url String
        //CONTENT for linebreak: number String (lines)
        components: [
          {
            type: { type: String },
            content: {
              english: { type: String, required: true },
              vietnamese: { type: String, required: true },
            },
          },
        ],
        //VND
        price: { type: Number, required: true },
        promotionPrice: { type: Number },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
