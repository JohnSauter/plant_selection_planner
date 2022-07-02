/* Routes of the form /nursery_manager/... */

const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/home', withAuth, (req, res) => {
  res.render('nursery_manager_home', {
    logged_in: req.session.logged_in,
    page_title: 'Nursery Manager Home',
  });
});

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

module.exports = router;
