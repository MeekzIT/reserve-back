"use strict";
const data = require("../mock/superAdmin");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SuperAdmins", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SuperAdmins", null, {});
  },
};
