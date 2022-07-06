/* Paths of the form /gardener/... */

const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');

const snakeToSentence = (snake) => snake.split("_").filter(x => x.length > 0).map((x) => (x.charAt(0).toUpperCase() + x.slice(1))).join(" ");

/* Routes go here, then the API routes.  */
router.get('/home', withAuth, async (req, res) => {
  // Get user id
  const userID = req.session.user_id;
  // Get user's garden zone
  let gardenZoneID;
  try {
    let gardenZoneData = await Garden_zone.findOne({
      where: { user_id: userID }
    })
    gardenZoneID = gardenZoneData.get({ plain: true }).id;
  } catch (err) {
    res.status(500).json(err);
  }
  // Get user's plants using garden zone id
  try {
    const collectionData = await Plant_instance.findAll({
      where: {
        garden_zone_id: gardenZoneID,
      },
      include: [
        {
          model: Plant_type,
          attributes: ["plant_name", "description", "hardiness_zone_lower", "hardiness_zone_upper", "habit", "life_cycle", "full_sun", "part_sun", "part_shade", "full_shade", "early_spring", "mid_spring", "late_spring", "early_summer", "mid_summer", "late_summer", "fall", "winter"],
        },
      ],
    });
    const collection = collectionData.map((plants) => plants.get({ plain: true} ));

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

    // Render page with collection data
    res.render("gardener_home", {
      collection: collection,
      logged_in: req.session.logged_in,
      gardener: req.session.gardener,
      nursery_manager: req.session.nursery_manager,
      page_title: 'Gardener Home',
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

module.exports = router;