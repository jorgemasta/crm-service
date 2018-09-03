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

module.exports.getCustomers = (req, res, next) => {
  Customer.find({}, (err, docs) => {
    if (err) next(err);
    const customers = docs.map(({ name, surname, id }) => ({
      name,
      surname,
      id
    }));
    res.json(customers);
  });
};

module.exports.getSingleCustomer = (req, res, next) => {
  const { customerId: _id } = req.params;

  Customer.findById(_id, (err, doc) => {
    if (err) next(err);
    const customer = {
      id: doc.id,
      name: doc.name,
      surname: doc.surname,
      createdBy: doc.createdBy,
      lastModifiedBy: doc.lastModifiedBy,
      photo: doc.photo
    };
    res.json(customer);
  });
};

module.exports.updateCustomer = (req, res, next) => {
  const {
    user: { id: userId },
    body,
    file,
    params: { customerId: _id }
  } = req;

  const updatedCustomer = {
    ...body,
    lastModifiedBy: userId
  };
  if (file && file.path) updatedCustomer.photo = file.path;

  Customer.updateOne({ _id }, updatedCustomer, err => {
    if (err) next(err);
    res.json({
      message: "Customer updated",
      updatedCustomer
    });
  });
};

module.exports.deleteCustomer = (req, res, next) => {
  const { customerId: _id } = req.params;
  Customer.deleteOne({ _id }, err => {
    if (err) next(err);
    res.json({
      message: "Customer deleted"
    });
  });
};
