"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Suport.init(
    {
      userId: DataTypes.INTEGER,
      countryId: DataTypes.INTEGER,
      question: DataTypes.STRING,
      answer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Suport",
    }
  );

  let User = sequelize.define("User");

  Suport.hasOne(User, {
    foreignKey: "id",
  });

  return Suport;
};
