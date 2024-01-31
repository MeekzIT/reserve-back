"use strict";
const data = require("../mock/box");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Boxes", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Boxes", null, {});
  },
};
