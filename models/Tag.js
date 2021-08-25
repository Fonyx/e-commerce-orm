const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
const validators = require('../helpers/validators');

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tag_name: {
      type: DataTypes.STRING(30),
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
    modelName: 'tag',
  }
);

module.exports = Tag;
