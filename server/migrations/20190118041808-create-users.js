'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING, 
        unique: true, 
        allowNull: false, 
        notEmpty: false
      },
      email: {
        type: Sequelize.STRING, 
        allowNull: false, 
        notEmpty: false
      },
      password: {
        type: Sequelize.STRING, 
        allowNull: false, 
        notEmpty: false
      },
      reset_password_token: {
        type: Sequelize.STRING
      },
      reset_password_expires: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('users');
  }
};