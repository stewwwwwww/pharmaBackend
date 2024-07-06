const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    categoryDescription: {
      type: String,
      required: true,
    },
    productList: [
      {
        name: { type: String, required: true },
        img: { type: String, required: true },
        description: { type: String, required: true },
        highlight: { type: String, required: true },
        price: { type: Number, required: true },
        promotionPrice: { type: Number },
        //TYPES: header, description, paragraph, point, image, linebreak
        //CONTENT for header, desription, paragraph, point: text String
        //CONTENT for image: url String
        //CONTENT for linebreak: number String (lines)
        components: [{ type: { type: String }, content: { type: String } }],
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
