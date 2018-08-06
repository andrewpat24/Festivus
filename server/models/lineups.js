'use strict';
module.exports = (sequelize, DataTypes) => {
  var lineups = sequelize.define('lineups', {
    artist_id: DataTypes.INTEGER,
    festival_id: DataTypes.INTEGER,
    showtime: DataTypes.STRING
  }, {});
  lineups.associate = function(models) {
    // associations can be defined here
  };
  return lineups;
};