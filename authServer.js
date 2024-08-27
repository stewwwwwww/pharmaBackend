require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});
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
