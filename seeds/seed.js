const sequelize = require('../config/connection');
const { User, Garden_zone, Plant_type, Plant_instance } = require('../models');

const plant_typeData = require('./plant_typeData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

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

seedDatabase();
