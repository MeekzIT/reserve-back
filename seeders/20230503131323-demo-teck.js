"use strict";
const data = require("../mock/tach");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Teches", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Teches", null, {});
  },
};
