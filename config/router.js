const passport = require("passport");

require("../services/passport");

const Authentication = require("../controllers/authentication");
const Customers = require("../controllers/customers");
const Users = require("../controllers/users");

const { allowOnly } = require("../helpers/routesHelper");
const upload = require("./uploadFilesConfig");
const { accessLevels } = require("./roles");

const requireSignin = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = app => {
  app.post("/login", requireSignin, Authentication.login);
  app.post(
    "/customers",
    requireAuth,
    upload.single("photo"),
    allowOnly(accessLevels.user, Customers.createCustomer)
  );
  app.post(
    "/users",
    requireAuth,
    allowOnly(accessLevels.admin, Users.createUser)
  );
};
