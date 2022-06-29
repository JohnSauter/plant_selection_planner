const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Garden_zone extends Model {}

Garden_zone.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    zone_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    plant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'plant_type',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'garden_zone',
  }
);

module.exports = Garden_zone;