const express = require("express");
const router = express.Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();
const { User } = require("../db");
const signupSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
});
const signinSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});
router.post("/signup", (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({ message: "Incorrect inputs" });
  } else {
    User.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        res.status(411).json({ message: "Email already taken" });
      } else {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
          }).then((user) => {
            res.status(200).json({
              message: "User created successfully",
              token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET),
            });
          });
        });
      }
    });
  }
});
router.post("/signin", (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({ message: "Wrong inputs" });
  } else {
    User.findOne({
      username: req.body.username,
    }).then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            res.status(200).json({
              token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET),
            });
          } else {
            res.status(411).json({ message: "Incorrect username/password" });
          }
        });
      } else {
        res.status(411).json({ message: "User doesn't exist" });
      }
    });
  }
});
module.exports = router;
