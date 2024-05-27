require("dotenv").config();
const cors = require('cors');
const express = require("express");

const workoutRoutes = require("./routes/workouts.js");
const productRoutes = require("./routes/product.js");
const researchRoutes = require("./routes/research.js");
const articleRoutes = require("./routes/article.js");
const faqRoutes = require("./routes/faq.js");
const memberRoutes = require("./routes/member.js");
const retailerRoutes = require("./routes/retailer.js");
const joinUsRoutes = require("./routes/hiring.js");
const mongoose = require("mongoose");
const requireAuthentication = require("./middleware/requireAuthentication.js")

const app = express();
app.use(express.json());
app.use(cors());

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
const generateToken = (user) => {
  // Ensure you have a user object with a unique identifier
  return jwt.sign(
    { userId: user._id }, // Payload
    process.env.SECRET_KEY, // Secret key from .env file
    { expiresIn: '1h' } // Token expiration time
  );
};

// Example usage
const user = { _id: '12345' }; // Replace with actual user object from your database
const token = generateToken(user);
console.log('Generated Token:', token);
app.use(requireAuthentication)

app.use("/api/workouts", workoutRoutes);
app.use("/Products", productRoutes);
app.use("/Researchs", researchRoutes);
app.use("/Articles", articleRoutes);
app.use("/Faqs", faqRoutes);
app.use("/Members", memberRoutes);
app.use("/Retailers", retailerRoutes);
app.use("/JoinUs", joinUsRoutes);
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
