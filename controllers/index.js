const router = require('express').Router();

const frontRoutes = require('./front/frontRoutes');
const userRoutes = require('./user/userRoutes');
const gardenerRoutes = require('./gardener/gardenerRoutes');
const nursery_managerRoutes = require('./nursery_manager/nursery_managerRoutes');

router.use('/', frontRoutes);
router.use('/user', userRoutes);
router.use('/gardener', gardenerRoutes);
router.use('/nursery_manager', nursery_managerRoutes);

module.exports = router;
