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
      full_location: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state_region: {
        type: Sequelize.STRING
      },
      lat_long: {
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
      twitter_url: {
        type: Sequelize.STRING
      },
      insta_url: {
        type: Sequelize.STRING
      },
      facebook_url: {
        type: Sequelize.STRING
      },
      view_count: {
        type: Sequelize.INTEGER
      },
      follower_count: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('festivals');
  }
};