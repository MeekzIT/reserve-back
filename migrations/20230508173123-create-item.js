"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      access: Sequelize.BOOLEAN,
      p0: Sequelize.INTEGER, // 1-moyka, 2-cux
      p2: Sequelize.STRING, // 1-moyka, 2-cux
      p5: Sequelize.INTEGER, // 1-moyka, 2-cux
      name: Sequelize.STRING,
      datatime: Sequelize.STRING,
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
    await queryInterface.dropTable("Items");
  },
};
