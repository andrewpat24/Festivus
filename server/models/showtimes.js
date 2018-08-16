'use strict';
module.exports = (sequelize, DataTypes) => {
  var showtimes = sequelize.define('showtimes', {
    festival_id: DataTypes.INTEGER,
    artist_id: DataTypes.INTEGER,
    showtime_span: DataTypes.STRING
  }, {});
  showtimes.associate = function(models) {
    // associations can be defined here
  };
  return showtimes;
};