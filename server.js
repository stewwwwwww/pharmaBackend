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
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    accessControlAllowOrigin: "http://localhost:3000",
  }),
);
//middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: "Authorization token required" });
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
    if (err) {
      console.log("Token verification failed", err);
      return res.status(403).json({ error: "Request is not authorized" });
    }
    next();
  });
};
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api/workouts", workoutRoutes);
app.use("/Products", authenticateToken, productRoutes);
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
