const express = require("express");
const router = express.Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();
const { User, Accounts } = require("../db");
const middleware = require("../middlewares/middleware");
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
const updationSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(6).optional(),
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
        bcrypt.hash(req.body.password, saltRounds).then((hash) => {
          User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
          }).then((user) => {
            Accounts.create({
              userId: user._id,
              balance: 1 + Math.random() * 10000,
            }).then((account) => {
              console.log("Account initialized with", account.balance);
            });
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
        bcrypt.compare(req.body.password, user.password).then((result) => {
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
router.put("/", middleware, async (req, res) => {
  const { success } = updationSchema.safeParse(req.body);
  if (success) {
    if (req.body.password) {
      //this means that the password needs to be updated.
      bcrypt.hash(req.body.password, saltRounds).then((hash) => {
        req.body.password = hash;
        User.findOneAndUpdate({ _id: req.userId }, req.body).then(() => {
          res.status(200).json({ message: "Profile updated with password" });
        });
      });
    } else {
      await User.findOneAndUpdate({ _id: req.userId }, req.body);
      res.status(200).json({ message: "Profile updated" });
    }
  }
});
router.get("/bulk", middleware, (req, res, next) => {
  const filter = req.query.filter || "";
  User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      {
        lastName: { $regex: filter, $options: "i" },
      },
    ],
  })
    .then((result) => {
      res.json({
        users: result.map((user) => ({
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        })),
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "We couldn't find what you were looking for" });
      next();
    });
});
module.exports = router;
