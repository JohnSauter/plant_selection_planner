const sequelize = require('../config/connection');
const { Plant, User } = require('../models');

const plantData = require('./plant_type.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Plant.bulkCreate(plantData, {
    ignoreDuplicates: true,
    returning: true,
  });

  await User.bulkCreate(userData, {
    ignoreDuplicates: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();