"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ItemModes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemModes.init(
    {
      p2: DataTypes.INTEGER,
      modeId: DataTypes.INTEGER,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ItemModes",
    }
  );

  let Category = sequelize.define("Category");

  ItemModes.belongsTo(Category, {
    foreignKey: "modeId",
  });

  return ItemModes;
};
