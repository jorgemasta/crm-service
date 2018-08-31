const passport = require("passport");

require("../services/passport");

const Authentication = require("../controllers/authentication");
const Users = require("../controllers/users");

const { allowOnly } = require("../helpers/routesHelper");
const roles = require("./roles");

const requireSignin = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = app => {
  app.post("/login", requireSignin, Authentication.login);
  app.post(
    "/users",
    requireAuth,
    allowOnly(roles.userRoles.admin, Users.createUser)
  );
};
