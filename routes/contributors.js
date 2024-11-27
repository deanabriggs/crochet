// Requipre resources
const router = require("express").Router();
const contributorsCtrl = require("../controllers/contributors");
const {
  contributorValidationRules,
  validate,
} = require("../utilities/validator");

// Call functions for the specific request
router.get("/", contributorsCtrl.getAllContributors);
router.get("/:id", contributorsCtrl.getSingleContributor);
router.post(
  "/",
  contributorValidationRules(),
  validate,
  contributorsCtrl.createContributor
);
router.put(
  "/:id",
  contributorValidationRules(),
  validate,
  contributorsCtrl.updateContributor
);
router.delete("/:id", contributorsCtrl.deleteContributor);

// Export the router
module.exports = router;
