const passport = require("passport");

const Authentication = require("./controllers/authentication");
require("./services/passport");

const requireSignin = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = app => {
  app.post("/login", requireSignin, Authentication.login);
  app.post("/users", requireAuth, Authentication.createUser);
};
