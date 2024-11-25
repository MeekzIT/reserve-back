"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      p0: DataTypes.INTEGER, // device type
      name: DataTypes.STRING,
      access: DataTypes.BOOLEAN,
      p2: DataTypes.STRING, // ownerId
      p5: DataTypes.INTEGER, // moikaID
      datatime: DataTypes.STRING,
      postIndex: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );

  let Box = sequelize.define("Box");
  // let ItemValues = sequelize.define("ItemValues");

  // Item.hasMany(Box, {
  //   foreignKey: "id",
  // });
  return Item;
};
