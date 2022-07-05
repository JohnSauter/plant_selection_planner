// Paths for /search

const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');

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


const apiRoutes = require('./api');
router.use('/api', apiRoutes);

module.exports = router;