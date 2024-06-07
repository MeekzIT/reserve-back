"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Boxes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			ownerId: {
				type: Sequelize.INTEGER,
			},
			desc: {
				type: Sequelize.STRING,
			},
			lat: {
				type: Sequelize.STRING,
			},
			lng: {
				type: Sequelize.STRING,
			},
			itemsId: {
				type: Sequelize.INTEGER,
			},
			interval: {
				type: Sequelize.STRING,
			},
			timeZone: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Boxes")
	},
}
