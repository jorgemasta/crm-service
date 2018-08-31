const userRoles = {
  user: 1, // ...001
  admin: 2 // ...010
};

module.exports = {
  userRoles,
  accessLevels: {
    user: userRoles.user | userRoles.admin,
    admin: userRoles.admin
  }
};
