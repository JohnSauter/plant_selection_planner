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

router.get('/', async (req, res) => {
  const plantData = await Plant_type.findAll();
  const plants = plantData.map((plant) => plant.get({ plain: true }));
  console.log(plants)

  res.render('search', { plants });
});

router.get('/results', async (req, res) => {
  res.render('search', {
    logged_in: req.session.logged_in,
    page_title: 'Results',
  });
});

router.get('/:criteria', async (req, res) => {
  try {
    const criteria = req.params.criteria
    const searchCriteria = JSON.parse(criteria);
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
        // full_sun: searchCriteria.fullSun,
        // part_sun: searchCriteria.partSun,
        // part_shade: searchCriteria.partShade,
        // full_shade: searchCriteria.fullShade,
        // early_spring: searchCriteria.earlySpring,
        // mid_spring: searchCriteria.midSpring,
        // late_spring: searchCriteria.lateSpring,
        // early_summer: searchCriteria.earlySummer,
        // mid_summer: searchCriteria.midSummer,
        // late_summer: searchCriteria.lateSummer,
        // fall: searchCriteria.fall,
        // winter: searchCriteria.winter,
      }
    });
    const plants = plantData.map((plant) => plant.get({ plain: true }));
    console.log(plants);
    res.json(plants);

    res.render('search', { plants });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    if (req.body) {
      const searchCriteria = req.body.criteria;
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
          // full_sun: searchCriteria.fullSun,
          // part_sun: searchCriteria.partSun,
          // part_shade: searchCriteria.partShade,
          // full_shade: searchCriteria.fullShade,
          // early_spring: searchCriteria.earlySpring,
          // mid_spring: searchCriteria.midSpring,
          // late_spring: searchCriteria.lateSpring,
          // early_summer: searchCriteria.earlySummer,
          // mid_summer: searchCriteria.midSummer,
          // late_summer: searchCriteria.lateSummer,
          // fall: searchCriteria.fall,
          // winter: searchCriteria.winter,
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

// Retrieve a plant by its id
router.get('/:id', async (req, res) => {
  const plantData = await Plant_type.findByPk(req.params.id)

  const plant = plantData.get({ plain: true });

  console.log(plant);
});

module.exports = router;