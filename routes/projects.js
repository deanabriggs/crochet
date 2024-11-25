// Requipre resources
const router = require('express').Router();
const projectsCtrl = require('../controllers/projects');

// Call functions for the specific request
router.get('/', projectsCtrl.getAllProjects);
router.get('/:id', projectsCtrl.getSingleProject);
router.post('/', projectsCtrl.createProject);
router.put('/:id', projectsCtrl.updateProject);
router.delete('/:id', projectsCtrl.deleteProject);

// Export the router
module.exports = router;