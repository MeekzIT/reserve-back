"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Country extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Country.init(
		{
			name: DataTypes.STRING,
			short: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Country",
		}
	)

	let Owner = sequelize.define("Owner")
	let Admin = sequelize.define("Admin")

	Country.hasMany(Owner, {
		foreignKey: "id",
	})
	Country.hasMany(Admin, {
		foreignKey: "id",
	})
	return Country
}
