const router = require('express').Router();
const { User, Garden_zone, Plant_type, Plant_instance } = require('../../Models');
const withAuth = require('../../utils/auth');

router.get('/login', async (req, res) => {
    res.render('login', {
      logged_in: req.session.logged_in,
      page_title: 'Log in or Sign Up',
    });
  })

/* Additional routes go here, 
 * then the API routes when we have them.
 * Planned routes are: get /user/login, 
 * get /user/signup_as_gardener, 
 * get /user/signup_as_nursery_manager and
 * post /front/signup_as_nursery_manager.
 * 
 * Planned API routes are: post /user/api/login,
 * post user/api/logout,
 * post /user/api/signup_as_gardener, and
 * post /usr/api/signup_as_nursery_manager
 * 
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

*/

module.exports = router;
