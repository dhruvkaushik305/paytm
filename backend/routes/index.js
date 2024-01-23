const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const accountRouter = require("./account");
const errorHandler = require("../middlewares/error");
router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use(errorHandler);
module.exports = router;
