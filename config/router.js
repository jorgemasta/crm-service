const passport = require("passport");

require("../services/passport");

const Authentication = require("../controllers/authentication");
const customersRoutes = require("../routes/customers");
const usersRoutes = require("../routes/users");

const requireSignin = passport.authenticate("local", { session: false });

module.exports = app => {
  app.post("/login", requireSignin, Authentication.login);
  app.use("/customers", customersRoutes);
  app.use("/users", usersRoutes);
};
