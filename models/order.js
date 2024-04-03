"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      workerId: DataTypes.INTEGER,
      boxId: DataTypes.STRING,
      post: DataTypes.INTEGER,
      price: DataTypes.STRING,
      worker: DataTypes.BOOLEAN,
      modes: DataTypes.STRING,
      time: DataTypes.STRING,
      payment: DataTypes.STRING,
      orderId:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  let ReservePoints = sequelize.define("ReservePoints");
  let Box = sequelize.define("Box");

  Order.hasOne(ReservePoints, {
    foreignKey: "id",
  });

  Order.belongsTo(Box, {
    foreignKey: "id",
  });
  return Order;
};
