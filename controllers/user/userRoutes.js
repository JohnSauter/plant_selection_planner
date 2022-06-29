const router = require('express').Router();
const { User, Garden_zone, Plant_type, Plant_instance } = require('../../Models');
const withAuth = require('../../utils/auth');

router.get('/sign_up_as_gardener', async (req, res) => {
  res.render('sign_up_as_gardener', {
    logged_in: req.session.logged_in,
    page_title: 'Sign Up as Gardener',
  });
})


/* Additional routes go here, 
 * then the API routes when we have them.
 * Planned routes are: 
 * get /user/signup_as_nursery_manager and
 * post /front/signup_as_nursery_manager.
 * 
 */
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

module.exports = router;
