module.exports = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Refer to the console for further info..." });
};
