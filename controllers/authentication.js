const jwt = require("jwt-simple");

const User = require("../models/user");
const { isValidEmail, isValidPassword } = require("../helpers/validateData");
const { JWT_SECRET } = process.env;

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp
    },
    JWT_SECRET
  );
}

module.exports.login = (req, res) => {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, role } = req.body;
  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res
      .status(422)
      .send({ error: "You must provide valid email and password." });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const user = new User({
      email,
      password,
      role
    });

    user.save(err => {
      if (err) return next(err);
      res.json({ token: tokenForUser(user) });
    });
  });
};
