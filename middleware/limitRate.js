const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 2,
  message: "Too many connection",
});
module.exports = apiLimiter;
