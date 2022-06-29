const User = require('./User');
const Garden_zone = require('./Garden_zone');
const Plant_type = require('./Plant_type');
const Plant_instance = require('./Plant_instance');

// Haley:
// I am working on associations: as I see it:
// a user can have many garden zones (although for now we will only allow/display one)
// a garden zone belongs to one user
// a garden zone can have many plants
// a plant can have many garden zones
// Therefore, we will have a one-to-many association and a many-to-many association
// A Nusery_area seems redundant as it would be identical to a garden_zone

// I struggle with associations so I am going to sleep on it, but I will be working on it Weds/Thurs

/* John responds:
 * For now we have only one garden_zone, so we
 * could get away with saying that a plant
 * belongs to one garden zone.  However, if we
 * want to add multiple garden zones in the
 * future, we will have a many-to-many relationship
 * between plants and garden zones.  Even with only
 * one garden zone per user, if we have multiple
 * gardeners we will have multiple garden_zones.
 * 
 * With a many-to-many relationship we need an
 * intermediate model to track it.  I will call
 * this intermediate model plant_instance, and
 * change model plant to plant_type (which is
 * already the name of the file).
 * 
 * I have folded nursery_area into garden_zone.
 * You are right: they are identical.
 */

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
