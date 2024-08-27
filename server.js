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
const contactRoutes = require("./routes/contact.js");
const orderRoutes = require("./routes/order.js");

const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const allowedOrigins = ["http://localhost:3000", "https://phuongminhpharma.netlify.app"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,PUT,POST,DELETE,OPTIONS", // allow these methods
    allowedHeaders: "Content-Type, Authorization", // allow these headers
  }),
);
app.use((req, res, next) => {
  const allowedOrigin = "https://phuongminhpharma.netlify.app"; // Your frontend origin

  if (req.headers.origin !== allowedOrigin) {
    return res.status(403).json({ message: "Forbidden: Access is denied." });
  }

  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});
//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/products", productRoutes);
app.use("/researchs", researchRoutes);
app.use("/articles", articleRoutes);
app.use("/faqs", faqRoutes);
app.use("/members", memberRoutes);
app.use("/retailers", retailerRoutes);
app.use("/joinUs", joinUsRoutes);
app.use("/contacts", contactRoutes);
app.use("/orders", orderRoutes);

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
