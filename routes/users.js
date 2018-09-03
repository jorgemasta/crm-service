const express = require("express");
const passport = require("passport");

const Users = require("../controllers/users");
const { allowOnly } = require("../helpers/routesHelper");
const { accessLevels } = require("../config/roles");

const router = express.Router();
const requireAuth = passport.authenticate("jwt", { session: false });

router.post("/", requireAuth, allowOnly(accessLevels.admin, Users.createUser));
router.get("/", requireAuth, allowOnly(accessLevels.admin, Users.getUsers));
router.put(
  "/:userId",
  requireAuth,
  allowOnly(accessLevels.admin, Users.updateUser)
);
router.delete(
  "/:userId",
  requireAuth,
  allowOnly(accessLevels.admin, Users.deleteUser)
);

module.exports = router;
