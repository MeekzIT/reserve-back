"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
      countryId: DataTypes.INTEGER,
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  let Country = sequelize.define("Country");
  let Suport = sequelize.define("Suport");

  User.hasOne(Suport, {
    foreignKey: "userId",
  });

  User.belongsTo(Country, {
    foreignKey: "countryId",
  });

  return User;
};
