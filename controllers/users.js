const User = require("../models/user");

const { isValidEmail, isValidPassword } = require("../helpers/validateData");
const tokenForUser = require("../helpers/tokenForUser");

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

module.exports.getUsers = (req, res, next) => {
  User.find({}, (err, docs) => {
    if (err) next(err);
    const users = docs.map(({ role, email, id }) => ({ role, email, id }));
    res.json(users);
  });
};

module.exports.updateUser = (req, res, next) => {
  const {
    body: { email, password, role },
    params
  } = req;

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res
      .status(422)
      .send({ error: "You must provide valid email and password." });
  }

  const user = { email, password, role };
  User.updateOne({ _id: params.userId }, user, err => {
    if (err) next(err);
    res.json({
      message: "User updated"
    });
  });
};

module.exports.deleteUser = (req, res, next) => {
  const { userId: _id } = req.params;
  User.deleteOne({ _id }, err => {
    if (err) next(err);
    res.json({
      message: "User deleted"
    });
  });
};
