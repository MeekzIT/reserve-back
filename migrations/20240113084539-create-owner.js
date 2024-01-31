'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Owners", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      token: Sequelize.STRING,
      subscribe: Sequelize.BOOLEAN,
      lastPay: Sequelize.STRING,
      variant: Sequelize.STRING,
      countryId: Sequelize.INTEGER,
      userId: Sequelize.INTEGER,
      role: Sequelize.STRING,
      deviceOwner: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Owners');
  }
};