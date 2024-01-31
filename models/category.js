"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      nameAm: DataTypes.STRING,
      nameRu: DataTypes.STRING,
      nameGe: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      nameAz: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );

  let ItemModes = sequelize.define("ItemModes");

  Category.hasOne(ItemModes, {
    foreignKey: "modeId",
  });
  return Category;
};
