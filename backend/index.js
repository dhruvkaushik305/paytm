const express = require("express");
const app = express();
const apiRouter = require("./routes/index");
app.use("/api/v1", apiRouter);
