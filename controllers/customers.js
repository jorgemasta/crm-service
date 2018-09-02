const Customer = require("../models/customer");

module.exports.createCustomer = (req, res, next) => {
  const {
    user: { id: userId },
    body: { name, surname },
    file
  } = req;

  if (!name || !surname || !file) {
    return res
      .status(422)
      .send({ error: "You must provide a 'name', a 'surname' and a 'photo'." });
  }

  const customer = new Customer({
    name,
    surname,
    createdBy: userId,
    lastModifiedBy: userId,
    photo: file.path
  });

  customer.save(err => {
    if (err) return next(err);
    res.json({ id: customer.id });
  });
};
