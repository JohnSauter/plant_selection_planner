const User = require('./User');
const Garden_zone = require('./Garden_zone');
const Nursery_area = require('./Nursery_area');
const Plant_type = require('./Plant_type');

// Haley:
// I am working on associations: as I see it:
// a user can have many garden zones (although for now we will only allow/display one)
// a garden zone belongs to one user
// a garden zone can have many plants
// a plant can have many garden zones
// Therefore, we will have a one-to-many association and a many-to-many association
// A Nusery_area seems redundant as it would be identical to a garden_zone

// I struggle with associations so I am going to sleep on it, but I will be working on it Weds/Thurs

User.hasMany(Garden_zone, {
  foreignKey: 'garden_zone_id',
  onDelete: 'CASCADE',
});

Garden_zone.belongsTo(User, {
  foreignKey: 'user_id',
});

Garden_zone.hasMany(Plant_type, {
  foreignKey: 'garden_zone_id',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Garden_zone,
  Nursery_area,
  Plant_type,
};
