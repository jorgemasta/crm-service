module.exports = function logErrors(err, req, res, next) {
  console.log({ err });

  next(err);
};
