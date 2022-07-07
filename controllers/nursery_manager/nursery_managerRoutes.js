/* Routes of the form /nursery_manager/... */

const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');
const { convertToRange } = require('../../utils/helpers')

router.get('/home', withAuth, (req, res) => {
  res.render('nursery_manager_home', {
    logged_in: req.session.logged_in,
    gardener: req.session.gardener,
    nursery_manager: req.session.nursery_manager,
    page_title: 'Nursery Manager Home',
  });
});

router.get('/customer/:customer_name', withAuth, async (req, res) => {
  // Get customer id from :customer_name
  try {
    const customerData = await User.findOne({
      where: {
        user_type: "Gardener",
        name: req.params.customer_name,
      },
      attributes: ["id", "name"],
    })

    if (customerData) {
      const customerID = customerData.get({ plain: true });

      // Get user's garden zone
      try {
        let gardenZoneData = await Garden_zone.findOne({
          where: { user_id: customerID.id },
        })
        const gardenZoneID = gardenZoneData.get({ plain: true });

          // Get user's plants using garden zone id
          try {
            const collectionData = await Plant_instance.findAll({
              where: {
                garden_zone_id: gardenZoneID.id,
              },
              include: [
                {
                  model: Plant_type,
                  //attributes: ["id", "plant_name", "description", "hardiness_zone_lower", "hardiness_zone_upper", "habit", "life_cycle", "full_sun", "part_sun", "part_shade", "full_shade", "early_spring", "mid_spring", "late_spring", "early_summer", "mid_summer", "late_summer", "fall", "winter"],
                },
              ],
            });
            const collection = collectionData.map((plants) => plants.get({ plain: true} ));

            // Convert sun/soi values to a range
            convertToRange(collection);

            res.render('nursery_manager_customer', {
              customer: customerID,
              collection: collection,
              logged_in: req.session.logged_in,
              gardener: req.session.gardener,
              nursery_manager: req.session.nursery_manager,
              page_title: 'Nursery Manager Customer',
            });
          
          } catch (err) {
            res.status(500).json(err);
          }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.render('nursery_manager_customer', {
        customer: false,
        logged_in: req.session.logged_in,
        gardener: req.session.gardener,
        nursery_manager: req.session.nursery_manager,
        page_title: 'Nursery Manager Customer',
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
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
