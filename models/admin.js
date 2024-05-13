"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Admin extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Admin.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			token: DataTypes.STRING,
			role: DataTypes.STRING,
			countryId: DataTypes.INTEGER,
			block: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Admin",
		}
	)

	let Country = sequelize.define("Country")

	Admin.belongsTo(Country, {
		foreignKey: "countryId",
	})
	return Admin
}
