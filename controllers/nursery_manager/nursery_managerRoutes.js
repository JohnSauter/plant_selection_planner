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

router.get('/customer/:customer_name', withAuth, async (req, res) => {
  // Get customer id from :customer_name
  let customerID;
  try {
    const customerData = await User.findOne({
      where: {
        user_type: "Gardener",
        name: req.params.customer_name,
      },
      attributes: ["id", "name"],
    })
    customerID = customerData.get({ plain: true });

    // Get user's garden zone
    let gardenZoneID;
    try {
      let gardenZoneData = await Garden_zone.findOne({
        where: { user_id: customerID.id },
      })
      gardenZoneID = gardenZoneData.get({ plain: true });

        // Get user's plants using garden zone id
        let collection;
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
          collection = collectionData.map((plants) => plants.get({ plain: true} ));

          // Convert sun/soi values to a range
          const snakeToSentence = (snake) => snake.split("_").filter(x => x.length > 0).map((x) => (x.charAt(0).toUpperCase() + x.slice(1))).join(" ");

          collection.forEach(plant => {
            plant.plant_type.sunExposureRange = "";
            plant.plant_type.seasonOfInterestRange = "";
            // Gather sun exposure and season of interest for each plant into arrays for later display
            const sunExposureArray = ["full_sun", "part_sun", "part_shade", "full_shade"];
            let sunExposureTrues = []
            const seasonOfInterestArray = ["early_spring", "mid_spring", "late_spring", "early_summer", "mid_summer", "late_summer", "fall", "winter"];
            let seasonOfInterestTrues = []
            sunExposureArray.forEach(item => {
              if (plant.plant_type[item]) {
                sunExposureTrues.push(snakeToSentence(item))
              };
            });
            seasonOfInterestArray.forEach(item => {
              if (plant.plant_type[item]) {
                seasonOfInterestTrues.push(snakeToSentence(item))
              };
            });
          
            // Capture sun exposure and season of interest ranges depending on whether there are 1 or more
            if (sunExposureTrues.length > 1) {
              plant.plant_type.sunExposureRange = sunExposureTrues[0] + " to " + sunExposureTrues.slice(-1)[0];
            } else {
              plant.plant_type.sunExposureRange = seasonOfInterestTrues[0];
            };
            if (seasonOfInterestTrues.length > 1) {
              plant.plant_type.seasonOfInterestRange = seasonOfInterestTrues[0] + " to " + seasonOfInterestTrues.slice(-1)[0];
            } else {
              plant.plant_type.seasonOfInterestRange = seasonOfInterestTrues[0];
            };
          });


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
