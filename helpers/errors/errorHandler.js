module.exports = function errorHandler(err, req, res) {
  res.status(500).send("Something broke!");
};
