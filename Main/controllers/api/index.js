const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
//  const dashboardRoutes = require('../dashboardRoutes');

// router.use('/dashboard', dashboardRoutes);
router.use('/users', userRoutes);
router.use('/post', postRoutes);

module.exports = router;
