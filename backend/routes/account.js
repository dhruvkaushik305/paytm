const express = require("express");
const middleware = require("../middlewares/middleware");
const { Accounts } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();
router.get("/balance", middleware, (req, res) => {
  Accounts.findOne({ userId: req.userId }).then((account) => {
    if (account) {
      res.json({ balance: account.balance });
    } else {
      res.json({ message: "The user doesn't exist" });
    }
  });
});
router.post("/transfer", middleware, async (req, res) => {
  const paymentSession = await mongoose.startSession();
  paymentSession.startTransaction();
  const { amount, to } = req.body;
  const sender = await Accounts.findOne({ userId: req.userId }).session(
    paymentSession
  );
  if (!sender || sender.balance < amount) {
    await paymentSession.abortTransaction();
    if (!sender) {
      return res.status(400).json({ message: "Sender doesn't exist" });
    } else {
      return res.status(400).json({ message: "Insufficient balance" });
    }
  }
  const receiver = await Accounts.findOne({ userId: to }).session(
    paymentSession
  );
  if (!receiver) {
    await paymentSession.abortTransaction();
    return res.status(400).json({ message: "Invalid receiver's account" });
  }
  //now we can transfer
  await Accounts.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(paymentSession);
  await Accounts.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(paymentSession);
  await paymentSession.commitTransaction();
  res.json({
    message: "Payment successful",
  });
});
module.exports = router;
