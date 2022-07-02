const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');

/* The empty route shows the front page.  */
router.get('/', async (req, res) => {
  res.render('front', {
    username: req.session.username,
    logged_in: req.session.logged_in,
    page_title: 'Plant Selection Planner',
  });
});

/* More routes go here, then the API routes if we have them.
 */

/* No API routes yet.
const apiRoutes = require('./api');
router.use('/api', apiRoutes);
*/

module.exports = router;