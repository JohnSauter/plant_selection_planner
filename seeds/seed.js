const sequelize = require('../config/connection');
const { Criterion, Garden_zone, Plant_instance, Plant_type, User }
  = require('../models');

const userData = require('./userData.json');
const garden_zoneData = require('./garden_zoneData.json');
const nursery_areaData = require('./nursery_areaData.json');
const plant_typeData = require('./plant_typeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const garden_zone = await User.bulkCreate(garden_zoneData, {
    individualHooks: true,
    returning: true,
  });

  const nursery_area = await User.bulkCreate(nursery_areaData, {
    individualHooks: true,
    returning: true,
  });
  
  const plant_type = await User.bulkCreate(plant_typeData, {
    individualHooks: true,
    returning: true,
  });

  /* As we create topics, randomly assign each to a user.  
  const topics = [];
  for (const topic of topicData) {
    const the_topic = await Topic.create({
      ...topic,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    topics.push(the_topic);
  };

  /* As we create responses, randomly assign each to a topic annd user. 
  for (const response of responseData) {
    await Response.create({
      ...response,
      topic_id: topics[Math.floor(Math.random() * topics.length)].id,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  */
};

seedDatabase();
