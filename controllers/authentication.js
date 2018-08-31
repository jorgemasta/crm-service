const tokenForUser = require("../helpers/tokenForUser");

module.exports.login = (req, res) => {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};
