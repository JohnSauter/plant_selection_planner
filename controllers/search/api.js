// Paths for /search

const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require("sequelize");

router.post('/', async (req, res) => {
  try {
    if (req.body) {
      const searchCriteria = req.body.criteria;
      const sunExposure = req.body.criteria.sunExposure;
      const seasonOfInterest = req.body.criteria.seasonOfInterest;

      // Collect only true values for sun/soi
      const sunExposureArray = ["full_sun", "part_sun", "part_shade", "full_shade"];
      const seasonOfInterestArray = ["early_spring", "mid_spring", "late_spring", "early_summer", "mid_summer", "late_summer", "fall", "winter"];
      let sunExposureTrues = []
      let seasonOfInterestTrues = []

      // Add JSON objects to arrays that will be used as query values
      const addJSONObj = (array, item) => array.push(JSON.parse(`{"${item}":true}`));

      // Iterate through options and only add selected options
      sunExposureArray.forEach(item => {
        if (sunExposure[item]) {
          addJSONObj(sunExposureTrues, item);
        };
      });
      seasonOfInterestArray.forEach(item => {
        if (seasonOfInterest[item]) {
          addJSONObj(seasonOfInterestTrues, item);
        };
      });
      
      // If no options were selected, force all to true
      if (!sunExposureTrues[0]) {
        sunExposureArray.forEach(item => {
          addJSONObj(sunExposureTrues, item);
        })
      }

      if (!seasonOfInterestTrues[0]) {
        seasonOfInterestArray.forEach(item => {
          addJSONObj(seasonOfInterestTrues, item);
        })
      }

      // Query database with given criteria
      const plantData = await Plant_type.findAll({
        where: {
          hardiness_zone_lower: {
            [Op.lte]: searchCriteria.hardiness,
          },
          hardiness_zone_upper: {
            [Op.gte]: searchCriteria.hardiness,
          },
          habit: searchCriteria.habit,
          life_cycle: searchCriteria.lifeCycle,
          [Op.or]: sunExposureTrues,
          [Op.or]: seasonOfInterestTrues,
        }
      });
      const plants = plantData.map((plant) => plant.get({ plain: true }));
      console.log(plants);
    res.json(plants);
  }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;