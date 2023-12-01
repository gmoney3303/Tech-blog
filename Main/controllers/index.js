const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homeRoutes); // Routes for homepage
router.use('/dashboard', dashboardRoutes); // Routes for dashboard
router.use('/api', apiRoutes);

module.exports = router;
