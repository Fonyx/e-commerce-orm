const { Model, DataTypes } = require('sequelize');
const validators = require('../helpers/validators');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey:true, 
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        'caller': (text) => {
          validators.stringSpacesNoNumbers(text);
        }
      }
    }
  },
  {
    sequelize: sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
