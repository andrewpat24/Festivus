'use strict';
module.exports = (sequelize, DataTypes) => {
  var festivals = sequelize.define('festivals', {
    name: DataTypes.STRING,
    show_url: DataTypes.STRING,
    full_location: DataTypes.STRING,
    city: DataTypes.STRING,
    state_region: DataTypes.STRING,
    lat_long: DataTypes.STRING,
    date_span: DataTypes.STRING,
    bio: DataTypes.STRING,
    logo: DataTypes.STRING,
    genre: DataTypes.STRING,
    twitter_url: DataTypes.STRING,
    insta_url: DataTypes.STRING,
    facebook_url: DataTypes.STRING,
    view_count: DataTypes.INTEGER,
    follower_count: DataTypes.INTEGER
  }, {});
  festivals.associate = function(models) {
    // associations can be defined here
  };
  return festivals;
};