// Requipre resources
const router = require('express').Router();
const contributorsCtrl = require('../controllers/contributors');

// Call functions for the specific request
router.get('/', contributorsCtrl.getAllContributors);
router.get('/:id', contributorsCtrl.getSingleContributor);
router.post('/', contributorsCtrl.createContributor);
router.put('/:id', contributorsCtrl.updateContributor);
router.delete('/:id', contributorsCtrl.deleteContributor);

// Export the router
module.exports = router;