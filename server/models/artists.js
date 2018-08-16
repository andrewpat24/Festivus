'use strict';
module.exports = (sequelize, DataTypes) => {
  var artists = sequelize.define('artists', {
    name: DataTypes.STRING,
    spotify_profile: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    bio: DataTypes.STRING,
    genre: DataTypes.STRING,
    wiki_url: DataTypes.STRING,
    insta_url: DataTypes.STRING,
    facebook_url: DataTypes.STRING,
    twitter_url: DataTypes.STRING,
    view_count: DataTypes.INTEGER,
    follower_count: DataTypes.INTEGER
  }, {});
  artists.associate = function(models) {
    // associations can be defined here
  };
  return artists;
};