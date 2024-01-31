"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Owner.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
      countryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      role: DataTypes.STRING,
      deviceOwner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Owner",
    }
  );

   let Country = sequelize.define("Country");
   let Tech = sequelize.define("Tech");
  //  let Box = sequelize.define("Box");

   Owner.belongsTo(Tech, {
     foreignKey: "id",
   });

   Owner.belongsTo(Country, {
     foreignKey: "countryId",
   });

  //  Owner.hasMany(Box, {
  //    foreignKey: "ownerId",
  //  });
  return Owner;
};
