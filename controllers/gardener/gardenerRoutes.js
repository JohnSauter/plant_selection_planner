/* Paths of the form /gardener/... */

const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');

/* Routes go here, then the API routes.  */
router.get('/home', withAuth, async (req, res) => {
  res.render('gardener_home', {
    logged_in: req.session.logged_in,
    page_title: 'Gardener Home',
  });
});

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

module.exports = router;