const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoute = require('./homeRoute.js');
const dashboardRoute = require('./dashboardRoute.js');

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoute);
router.use('/', homeRoute);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;