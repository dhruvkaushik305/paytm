const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("DB's up");
});
const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});
const User = new mongoose.model("User", userSchema);
module.exports = {
  User,
};
