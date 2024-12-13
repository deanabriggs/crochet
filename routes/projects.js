// Requipre resources
const router = require("express").Router();
const projectsCtrl = require("../controllers/projects");
const { projectValidationRules, validate } = require("../middleware/validator");
const { isAuth } = require("../middleware/authenticate");

// Call functions for the specific request
router.get("/", projectsCtrl.getAllProjects);
router.get("/:id", projectsCtrl.getSingleProject);
router.post(
  "/",
  isAuth,
  projectValidationRules(),
  validate,
  projectsCtrl.createProject
);
router.put(
  "/:id",
  isAuth,
  projectValidationRules(),
  validate,
  projectsCtrl.updateProject
);
router.delete("/:id", isAuth, projectsCtrl.deleteProject);

// Export the router
module.exports = router;
