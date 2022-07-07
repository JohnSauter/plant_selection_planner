/* paths of the form /nursery_manager/api/...  */

const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');

const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.put('/plant_type/:plant_type_id', withAuth, async (req, res) => {
  const updated_plant_type = await Plant_type.update(req.body, {
    id: req.params.plant_type_id,
  });

  if (!updated_plant_type) {
    res.status(404).end();
    return;
  }

  res.status(200).end();
});

router.post('/plant_type', withAuth, async (req, res) => {
  console.log(req.body.criteria)
  const created_plant_type = await Plant_type.create(req.body.criteria);

  if (!created_plant_type) {
    res.status(500).end();
    return;
  }

  res.status(200).json(created_plant_type);
});

/* Empty the database and reload it with the testing data.  */
router.post('/seed', withAuth, async (req, res) => {
  /* Empty and reload the database.  */
  await seedDatabase();

  /* Since we have a new user table, this user may not be valid.
   * Make him log in again, or re-sign up.  */
  req.session.logged_in = false;
  req.session.gardener = false;
  req.session.nursery_manager = false;
  req.session.save();
  res.redirect('/');
});

/* Seed the database from the initialization data in the seed directory.
 */
const sequelize = require('../../config/connection');
const plant_typeData = require('../../seeds/plant_typeData.json');
const userData = require('../../seeds/userData.json');
const { Op } = require('sequelize');

const seedDatabase = async () => {
  /* Remove all of the records in the tables.
   * We cannot drop and re-create them because they
   * are inter-dependent.  */
  await Plant_instance.destroy({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });
  await Garden_zone.destroy({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });
  await User.destroy({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });
  await Plant_type.destroy({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });

  /* As we create users, create a garden zone for each.  */
  const garden_zones = [];
  for (const user of userData) {
    const the_user = await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      user_type: user.user_type,
    });
    const the_garden_zone = await Garden_zone.create({
      name: '',
      user_id: the_user.id,
    });
    garden_zones.push(the_garden_zone);
  }

  /* As we create plant_types, randomly assign each to a garden_zone.
   * This is only for testing; for production the garden_zones
   * will start empty.
   */
  for (const plant_type of plant_typeData) {
    const the_plant_type = await Plant_type.create({
      ...plant_type,
    });
    const the_plant_instance = await Plant_instance.create({
      plant_type_id: the_plant_type.id,
      garden_zone_id:
        garden_zones[Math.floor(Math.random() * garden_zones.length)].id,
    });
  }
};

module.exports = router;
