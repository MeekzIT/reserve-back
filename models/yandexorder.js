'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class YandexOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  YandexOrder.init({
    postId: DataTypes.STRING,
    price: DataTypes.STRING,
    orderId: DataTypes.STRING,
    time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'YandexOrder',
  });
  return YandexOrder;
};