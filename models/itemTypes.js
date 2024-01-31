"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ItemTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemTypes.init(
    {
      p2: DataTypes.INTEGER,
      typeId: DataTypes.INTEGER,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ItemTypes",
    }
  );

  let Type = sequelize.define("Type");

  ItemTypes.belongsTo(Type, {
    foreignKey: "typeId",
  });

  return ItemTypes;
};
