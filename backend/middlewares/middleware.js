const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Token not found" });
  }
};
