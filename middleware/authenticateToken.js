jwt = require("jsonwebtoken")

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
module.exports = authenticateToken

