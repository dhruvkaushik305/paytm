const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/index");
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", apiRouter);
app.listen(3000, () => {
  console.log("Backend's up and running @3000");
});
