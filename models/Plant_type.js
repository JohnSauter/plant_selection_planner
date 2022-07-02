const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plant_type extends Model {}

Plant_type.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    plant_name: {
      // Binomial Nomenclature (scientific name)
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      // Common name, variety, and/or description
      type: DataTypes.STRING,
      allowNull: true,
    },
    hardiness_zone_lower: {
      // zones 1 through 13
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hardiness_zone_upper: {
      // zones 1 through 13
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    habit: {
      // tree, shrub, vine, grass, herb
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      // l x w
      type: DataTypes.STRING,
      allowNull: true,
    },
    life_cycle: {
      // annual, biennial, perennial
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Sun exposure: full sun, part sun, part shade, full shade ---> range
    full_sun: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    part_sun: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    part_shade: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    full_shade: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    // Season of Interest
    early_spring: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    mid_spring: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    late_spring: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    early_summer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    mid_summer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    late_summer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    fall: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    winter: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'plant_type',
  }
);

module.exports = Plant_type;
