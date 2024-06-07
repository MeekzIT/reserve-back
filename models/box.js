"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Box extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Box.init(
		{
			ownerId: DataTypes.INTEGER,
			name: DataTypes.STRING,
			desc: DataTypes.STRING,
			lat: DataTypes.STRING,
			lng: DataTypes.STRING,
			itemsId: DataTypes.INTEGER,
			interval: DataTypes.STRING,
			timeZone: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Box",
		}
	)

	let Owner = sequelize.define("Owner")
	let Order = sequelize.define("Order")

	let Item = sequelize.define("Item")

	Box.belongsTo(Owner, {
		foreignKey: "id",
	})

	Box.hasMany(Order, {
		foreignKey: "boxId",
	})

	return Box
}
