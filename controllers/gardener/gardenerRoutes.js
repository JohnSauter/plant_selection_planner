/* Paths of the form /gardener... */
const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');

/* Routes go here, then the API routes.  */

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

module.exports = router;
