const passport = require("passport");

require("./services/passport");

const Authentication = require("./controllers/authentication");
const { allowOnly } = require("./helpers/routesHelper");
const config = require("./config");

const requireSignin = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = app => {
  app.post("/login", requireSignin, Authentication.login);
  app.post(
    "/users",
    requireAuth,
    allowOnly(config.userRoles.admin, Authentication.createUser)
  );
};
