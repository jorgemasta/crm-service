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
router.get(
  "/",
  requireAuth,
  allowOnly(accessLevels.user, Customers.getCustomers)
);
router.put(
  "/:customerId",
  requireAuth,
  upload.single("photo"),
  allowOnly(accessLevels.user, Customers.updateCustomer)
);
router.delete(
  "/:customerId",
  requireAuth,
  allowOnly(accessLevels.user, Customers.deleteCustomer)
);
module.exports = router;
