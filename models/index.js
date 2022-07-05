const User = require('./User');
const Garden_zone = require('./Garden_zone');
const Plant_type = require('./Plant_type');
const Plant_instance = require('./Plant_instance');

/* A user has many garden_zones.  */
User.hasMany(Garden_zone, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Garden_zone.belongsTo(User, {
  foreignKey: 'user_id',
});

/* A garden_zone has many plants, and plants have many
 * garden_zones.  To represent this, divide plant
 * into plant_type and plant_instance.  Then a garden_zone
 * has many plant_instances, but a plant_instance
 * belongs to just one garden_zone.  On the other side,
 * a plant_type has many plant_instances, but a
 * plant_instance belongs to just one plant_type.
 */
Garden_zone.hasMany(Plant_instance, {
  foreignKey: 'garden_zone_id',
  onDelete: 'CASCADE',
});

Plant_instance.belongsTo(Garden_zone, {
  foreignKey: 'garden_zone_id',
});

Plant_type.hasMany(Plant_instance, {
  foreignKey: 'plant_type_id',
  onDelete: 'CASCADE',
});

Plant_instance.belongsTo(Plant_type, {
  foreignKey: 'plant_type_id',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
};
