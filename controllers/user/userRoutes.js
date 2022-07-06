/* Paths of the form /user/...  */

const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');

/* Take the browser to the home page.  If the user is not
 * logged in this is the front page.  Otherwise it is the
 * page appropriate for his user_type.  */
router.get('/home', async (req, res) => {
  if (req.session.logged_in) {
    if (req.session.gardener) {
      res.redirect('/gardener/home');
      return;
    }
    if (req.session.nursery_manager) {
      res.redirect('/nursery_manager/home');
      return;
    }
  }
  res.redirect('/');
});

router.get('/login', async (req, res) => {
  res.render('login', {
    logged_in: req.session.logged_in,
    gardener: req.session.gardener,
    nursery_manager: req.session.nursery_manager,
    page_title: 'Login',
  });
});

router.get('/sign_up_as_gardener', async (req, res) => {
  res.render('sign_up', {
    logged_in: req.session.logged_in,
    gardener: req.session.gardener,
    nursery_manager: req.session.nursery_manager,
    page_title: 'Sign Up as Gardener',
    user_type: 'Gardener',
  });
});

router.get('/sign_up_as_nursery_manager', async (req, res) => {
  res.render('sign_up', {
    logged_in: req.session.logged_in,
    gardener: req.session.gardener,
    nursery_manager: req.session.nursery_manager,
    page_title: 'Sign Up as Nursery Manager',
    user_type: 'Nursery',
  });
});

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

module.exports = router;
