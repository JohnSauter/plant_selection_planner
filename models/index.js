const User = require('./User');
const Garden_zone = require('./Garden_zone');
const Nursery_area = require('./Nursery_area');
const Plant_type = require('./Plant_type');

/* Example code for establishing replationships

User.hasMany(Topic, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Topic.belongsTo(User, {
  foreignKey: 'user_id'
});

Topic.hasMany(Response, {
  foreignKey: 'topic_id',
  onDelete: 'CASCADE'
});

Response.belongsTo(Topic, {
  foreignKey: 'topic_id'
});

User.hasMany(Response, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Response.belongsTo(User, {
  foreignKey: 'user_id'
});

*/
module.exports = {
  User,
  Garden_zone,
  Nursery_area,
  Plant_type,
};
