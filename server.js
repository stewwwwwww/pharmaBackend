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
const allowedOrigins = [
  "http://localhost:3000",
  "https://palegreen-sardine-650982.hostingersite.com/",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,PUT,POST,DELETE,OPTIONS,PATCH", // allow these methods
    allowedHeaders: "Content-Type, Authorization", // allow these headers
  }),
);
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Check if the origin is allowed
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    // If the origin is not allowed, return a 403 response
    return res.status(403).json({ message: "Forbidden: Access is denied." });
  }

  // Set other CORS headers
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS,PATCH",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
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
app.use("/researches", researchRoutes);
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
