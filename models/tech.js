"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tech extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tech.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
      countryId: DataTypes.INTEGER,
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      adminId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tech",
    }
  );
  let Owner = sequelize.define("Owner");

  let Country = sequelize.define("Country");

  Tech.belongsTo(Country, {
    foreignKey: "countryId",
  });

  Tech.hasMany(Owner, {
    foreignKey: "userId",
  });

  return Tech;
};
