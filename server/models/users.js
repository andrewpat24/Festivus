'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING, 
      unique: true, 
      allowNull: false, 
      notEmpty: false
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false, 
      notEmpty: false
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false, 
      notEmpty: false
    },
    reset_password_token: DataTypes.STRING,
    reset_password_expires: DataTypes.DATE
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};