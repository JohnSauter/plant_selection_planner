const User = require('./User');
const Topic = require('./Topic');
const Response = require('./Response');

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

module.exports = { User, Topic, Response };
