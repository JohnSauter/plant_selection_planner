const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plant_instance extends Model {}

Plant_instance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    plant_type_id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: 'plant_type',
        key: 'id',
      },
    },
    garden_area_id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: 'garden_area',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'plant_instance',
  }
);

module.exports = Plant_instance;
