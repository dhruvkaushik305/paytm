const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  if (req.header.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      if (userId) {
        req.userId = userId;
        console.log("verified");
        next();
      } else {
        console.log(userId);
        return res.status(403).json({ message: "Credentials not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(403).json({ message: "Token not found" });
    }
  } else {
    return res.json({ message: "No authorization provided" });
  }
};
