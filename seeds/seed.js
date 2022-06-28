const sequelize = require('../config/connection');
const { User, Topic, Response } = require('../models');

const userData = require('./userData.json');
const topicData = require('./topicData.json');
const responseData = require('./responseData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  /* As we create topics, randomly assign each to a user.  */
  const topics = [];
  for (const topic of topicData) {
    const the_topic = await Topic.create({
      ...topic,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    topics.push(the_topic);
  };

  /* As we create responses, randomly assign each to a topic annd user.  */
  for (const response of responseData) {
    await Response.create({
      ...response,
      topic_id: topics[Math.floor(Math.random() * topics.length)].id,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
