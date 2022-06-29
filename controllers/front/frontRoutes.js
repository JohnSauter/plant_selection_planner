const router = require('express').Router();
const { User, Garden_zone, Plant_type, Plant_instance } = require('../../Models');
const withAuth = require('../../utils/auth');

/* The empty route shows the front page.  */
router.get('/', async (req, res) => {
  res.render('front', {
    logged_in: req.session.logged_in,
    page_title: 'Plant Selection Planner',
  });
})

/* More routes go here, then the API routes if we have them.
 * Planned routes are: get /front/login, post /front/login,
 * get /front/signup_as_gardener, post /front/signup_as_gardener,
 * get /front/signup_as_nursery_manager and
 * post /front/signup_as_nursery_manager.
  */

/* No API routes yet.
const apiRoutes = require('./api');
router.use(apiRoutes);
*/

module.exports = router;
