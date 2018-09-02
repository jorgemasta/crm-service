const express = require("express");
const passport = require("passport");

const Customers = require("../controllers/customers");
const { allowOnly } = require("../helpers/routesHelper");
const { accessLevels } = require("../config/roles");
const upload = require("../config/uploadFilesConfig");

const router = express.Router();
const requireAuth = passport.authenticate("jwt", { session: false });

router.post(
  "/",
  requireAuth,
  upload.single("photo"),
  allowOnly(accessLevels.user, Customers.createCustomer)
);
module.exports = router;
