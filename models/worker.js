"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Worker.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      token: DataTypes.STRING,
      countryId: DataTypes.INTEGER,
      role: DataTypes.STRING,
      password: DataTypes.STRING,
      startHour: DataTypes.STRING,
      endHour: DataTypes.STRING,
      hours: DataTypes.TEXT,
      boxId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Worker",
    }
  );
  return Worker;
};
