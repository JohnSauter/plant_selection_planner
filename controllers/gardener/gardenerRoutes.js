/* Paths of the form /gardener... */
const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../Models');
const withAuth = require('../../utils/auth');

/* Routes go here, then the API routes.  */
router.get('/', async (req, res) => {
  res.render('gardener_home', {
    logged_in: req.session.logged_in,
    page_title: 'Gardener Home',
  });
});

router.get('/search', async (req, res) => {
  res.render('gardener_search', {
    logged_in: req.session.logged_in,
    page_title: 'Gardener Search',
  });
});

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

module.exports = router;
