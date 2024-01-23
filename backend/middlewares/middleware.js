const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (userId) {
      req.userId = userId;
      next();
    } else {
      console.log(userId);
      return res.status(403).json({ message: "Credentials not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Token not found" });
  }
};
