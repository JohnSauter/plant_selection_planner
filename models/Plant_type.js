const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plant_type extends Model {}

Plant.init(
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
      allowNull: false,
    },
    life_span: {
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
    season_of_interest_lower: {
      // early spring = 1, mid spring = 2, late spring = 3, early summer = 4, mid summer = 5, late summer = 6, fall = 7, winter = 8 ---> range
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    season_of_interest_upper: {
      // early spring = 1, mid spring = 2, late spring = 3, early summer = 4, mid summer = 5, late summer = 6, fall = 7, winter = 8 ---> range
      type: DataTypes.INTEGER,
      allowNull: false,
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
