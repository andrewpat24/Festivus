'use strict';
module.exports = (sequelize, DataTypes) => {
  var artist = sequelize.define('artist', {
    name: DataTypes.STRING,
    spotifyProfile: DataTypes.STRING,
    showtimes: DataTypes.STRING,
    profilePicture: DataTypes.STRING
  }, {});
  artist.associate = function(models) {
    // associations can be defined here
  };
  return artist;
};