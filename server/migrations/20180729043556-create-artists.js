'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('artists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      spotify_profile: {
        type: Sequelize.STRING
      },
      profile_picture: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      wiki_url: {
        type: Sequelize.STRING
      },
      insta_url: {
        type: Sequelize.STRING
      },
      facebook_url: {
        type: Sequelize.STRING
      },
      twitter_url: {
        type: Sequelize.STRING
      },
      view_count: {
        type: Sequelize.INTEGER
      },
      follower_count: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('artists');
  }
};