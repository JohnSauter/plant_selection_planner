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
    gardener: req.session.gardener,
    nursery_manager: req.session.nursery_manager,
    page_title: 'Nursery Manager Home',
  });
});

router.get('/customer/:customer_name', withAuth, (req, res) => {
  res.render('nursery_manager_customer', {
    logged_in: req.session.logged_in,
    gardener: req.session.gardener,
    nursery_manager: req.session.nursery_manager,
    page_title: 'Nursery Manager Customer',
  });
});

router.get('/add_plant', withAuth, (req, res) => {
  res.render('nursery_manager_add_plant', {
    logged_in: req.session.logged_in,
    gardener: req.session.gardener,
    nursery_manager: req.session.nursery_manager,
    page_title: 'Nursery Manager Add Plant',
  });
});

router.get('/edit_plant/:plant_type_id', withAuth, async (req, res) => {
  const plantData = await Plant_type.findByPk(req.params.plant_type_id)
  const plant = plantData.get({ plain: true });

  res.render('nursery_manager_edit_plant', {
    plant: plant,
    logged_in: req.session.logged_in,
    gardener: req.session.gardener,
    nursery_manager: req.session.nursery_manager,
    page_title: 'Nursery Manager Customer',
  });
});

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

module.exports = router;
