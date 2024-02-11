"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReservePoints extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReservePoints.init(
    {
      userId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
      time: DataTypes.STRING,
      point: DataTypes.STRING,
      success:DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "ReservePoints",
    }
  );

  let Order = sequelize.define("Order");

  ReservePoints.belongsTo(Order, {
    foreignKey: "orderId",
  });

  return ReservePoints;
};
