 // Requipre resources
const router = require('express').Router();

// Home page route
router.get('/', (req, res) => {
    // #swagger.tags=['Home Page']
    res.send('Home Page');
});

// Sub-routes
router.use('/contributors', require('./contributors'));
router.use('/projects', require('./projects'));
router.use('/', require('./swagger'));

// Export router
module.exports = router;