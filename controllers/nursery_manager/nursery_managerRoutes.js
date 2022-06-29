const router = require('express').Router();
const { User, Garden_zone, Plant_type, Plant_instance } = require('../../Models');
const withAuth = require('../../utils/auth');

/* Routes go here, then the API routes when we have them.

const apiRoutes = require('./api');
router.use(apiRoutes);

*/

module.exports = router;
