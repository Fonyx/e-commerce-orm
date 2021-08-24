const { Model, DataTypes } = require('sequelize');

const connection = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
  },
  {
    connection,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
