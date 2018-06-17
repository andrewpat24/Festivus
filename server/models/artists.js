'use strict';
module.exports = (sequelize, DataTypes) => {
  var artists = sequelize.define('artists', {
    name: DataTypes.STRING,
    spotify_profile: DataTypes.STRING,
    showtime: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    bio: DataTypes.STRING,
    festival_id: DataTypes.INTEGER
  }, {});
  artists.associate = function(models) {
    // associations can be defined here
  };
  return artists;
};