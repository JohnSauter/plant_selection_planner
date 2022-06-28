const router = require('express').Router();
const userRoutes = require('./userRoutes');
const topicRoutes = require('./topicRoutes');
const responseRoutes = require('./responseRoutes');

router.use('/user', userRoutes);
router.use('/topic', topicRoutes);
router.use('/response', responseRoutes);

module.exports = router;
