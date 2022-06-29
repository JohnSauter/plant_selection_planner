const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../Models');
const withAuth = require('../../utils/auth');

/* Take the browser to the home page.  If the user is not
 * logged in this is the front page.  Otherwise it is the
 * page appropriate for his user_type.  */
router.get('/home', async (req, res) => {
  if (req.session.logged_in) {
    if (req.session.gardener) {
      res.render('gardener_home', {
        logged_in: req.session.logged_in,
        page_title: 'Gardener Home',
      });
      return;
    };
    if (req.session.nursery_manager) {
      res.render('nursery_manager_home', {
        logged_in: req.session.logged_in,
        page_title: 'Nursery Manager Home',
      });
      return;
    }
  };
  res.render('front', {
    logged_in: req.session.logged_in,
    page_title: 'Plant Selection Planner',
  });
});

router.get('/login', async (req, res) => {
  res.render('login', {
    logged_in: req.session.logged_in,
    page_title: 'Login',
  });
});

router.get('/sign_up_as_gardener', async (req, res) => {
  res.render('sign_up_as_gardener', {
    logged_in: req.session.logged_in,
    page_title: 'Sign Up as Gardener',
  });
});

router.get('/sign_up_as_nursery_manager', async (req, res) => {
  res.render('sign_up_as_nursery_manager', {
    logged_in: req.session.logged_in,
    page_title: 'Sign Up as Nursery Manager',
  });
});

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

module.exports = router;
