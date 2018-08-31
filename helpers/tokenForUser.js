const jwt = require("jwt-simple");

const { JWT_SECRET } = process.env;

module.exports = user => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp
    },
    JWT_SECRET
  );
};
