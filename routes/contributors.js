// Requipre resources
const router = require("express").Router();
const contributorsCtrl = require("../controllers/contributors");
const {
  contributorValidationRules,
  validate,
} = require("../middleware/validator");
const { isAuth } = require("../middleware/authenticate");

// Call functions for the specific request
router.get("/", contributorsCtrl.getAllContributors);
router.get("/:id", contributorsCtrl.getSingleContributor);
router.post(
  "/",
  isAuth,
  contributorValidationRules(),
  validate,
  contributorsCtrl.createContributor
);
router.put(
  "/:id",
  isAuth,
  contributorValidationRules(),
  validate,
  contributorsCtrl.updateContributor
);
router.delete("/:id", isAuth, contributorsCtrl.deleteContributor);

// Export the router
module.exports = router;
