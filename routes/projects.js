// Requipre resources
const router = require("express").Router();
const projectsCtrl = require("../controllers/projects");
const { projectValidationRules, validate } = require("../middleware/validator");

// Call functions for the specific request
router.get("/", projectsCtrl.getAllProjects);
router.get("/:id", projectsCtrl.getSingleProject);
router.post(
  "/",
  projectValidationRules(),
  validate,
  projectsCtrl.createProject
);
router.put(
  "/:id",
  projectValidationRules(),
  validate,
  projectsCtrl.updateProject
);
router.delete("/:id", projectsCtrl.deleteProject);

// Export the router
module.exports = router;
