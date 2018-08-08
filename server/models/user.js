'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    SpotifyId: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    proPic: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};