require("dotenv").config();
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");

const workoutRoutes = require("./routes/workouts.js");
const productRoutes = require("./routes/product.js");
const researchRoutes = require("./routes/research.js");
const articleRoutes = require("./routes/article.js");
const faqRoutes = require("./routes/faq.js");
const memberRoutes = require("./routes/member.js");
const retailerRoutes = require("./routes/retailer.js");
const joinUsRoutes = require("./routes/hiring.js");
const contactRoutes = require("./routes/contact.js")
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(
  cors({
  }),
);
//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api/workouts", workoutRoutes);
app.use("/products", productRoutes);
app.use("/researchs", researchRoutes);
app.use("/articles", articleRoutes);
app.use("/faqs", faqRoutes);
app.use("/members", memberRoutes);
app.use("/retailers", retailerRoutes);
app.use("/joinUs", joinUsRoutes);
app.use("/contacts", contactRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to MongoDB and listening on", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
