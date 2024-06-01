require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const generateToken = (user) => {
  return jwt.sign(user, process.env.SECRET_TOKEN, {expiresIn : "60s"});
};


app.post("/login", (req, res) => {
  const username = req.body.user;
  const user = { name: username };

  const accessToken = generateToken(user);
  res.json({ accessToken: accessToken });
  console.log(refreshTokens)
});
app.post("/token", (req, res) => {

      const accessToken = generateToken({ name: user.name });
      res.json({ accessToken: accessToken });
    },
  );

PORT=8000
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);