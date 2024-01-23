const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("DB's up");
  })
  .catch((err) => {
    console.log(err);
  });
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLenght: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
  },
});
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const User = new mongoose.model("User", userSchema);
const Accounts = new mongoose.model("Account", accountSchema);
module.exports = {
  User,
  Accounts,
};
