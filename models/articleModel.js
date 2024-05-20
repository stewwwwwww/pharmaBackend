const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    highlight: { type: String, required: true },
    img: { type: String, required: true },
    //TYPES: header, description, paragraph, point, image, linebreak
        //CONTENT for header, desription, paragraph, point: text String
        //CONTENT for image: url String
        //CONTENT for linebreak: number String (lines)
        components: [{ type: { type: String }, content: { type: String } }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Article", articleSchema);
