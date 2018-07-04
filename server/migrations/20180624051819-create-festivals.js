'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('festivals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      show_url: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      date_span: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('festivals');
  }
};