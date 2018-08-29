const passport = require("passport");

const Authentication = require("./controllers/authentication");
require("./services/passport");
const requireSignin = passport.authenticate("local", { session: false });

module.exports = app => {
  app.post("/login", requireSignin, Authentication.login);
  app.post("/users", Authentication.createUser);
};
