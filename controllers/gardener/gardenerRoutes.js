/* Paths of the form /gardener/... */

const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');

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
          attributes: ["plant_name", "description", "hardiness_zone_lower", "hardiness_zone_upper", "habit", "life_cycle"],
        },
      ],
    });
    const collection = collectionData.map((plants) => plants.get({ plain: true} ));
    // Render page with collection data
    res.render("gardener_home", {
      collection: collection,
      logged_in: req.session.logged_in,
      page_title: 'Gardener Home',
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

module.exports = router;