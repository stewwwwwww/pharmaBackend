require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const generateToken = (user) => {
  return jwt.sign(user, process.env.SECRET_TOKEN);
};

let refreshTokens = [];

app.post("/login", (req, res) => {
  const username = req.body.user;
  const user = { name: username };

  const accessToken = generateToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});
app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401);
  if (!refreshTokens.includes(refreshToken)) return res.status(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN,
    (err, user) => {
      if (err) return res.status(403);
      const accessToken = generateToken({ name: user.name });
      res.json({ accessToken: accessToken });
    },
  );
});

app.app.listen(8000);
