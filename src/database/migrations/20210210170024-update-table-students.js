"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("students", "profile_image", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("students", "profile_image");
  },
};
