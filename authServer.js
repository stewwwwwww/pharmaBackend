require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allowed-Origin", "https://localhost:3000");
});
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  }),
);
app.post("/token", (req, res) => {
  if (req.headers["authorization"] === `Bearer ${process.env.SECRET_TOKEN}`) {
    const accessToken = jwt.sign({ user: "admin" }, process.env.SECRET_TOKEN, {
      expiresIn: "6000s",
    });
    res.json({ accessToken: accessToken });
  } else {
    res.json({ err: "invalid" });
  }
});

PORT = 8000;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
