const router = require('express').Router();

const frontRoutes = require('./frontRoutes');
const gardenerRoutes = require('./gardenerRoutes');
const nursery_managerRoutes = require('./nursery_managerRoutes');

router.use('/', frontRoutes);
router.use('/gardener', gardenerRoutes);
router.use('/nursery_manager', nursery_managerRoutes);

module.exports = router;
