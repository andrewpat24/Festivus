'use strict';
module.exports = (sequelize, DataTypes) => {
  var festival = sequelize.define('festival', {
    name: DataTypes.STRING,
    showUrl: DataTypes.STRING,
    location: DataTypes.STRING,
    dateSpan: DataTypes.STRING,
    artistLineup: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {});
  festival.associate = function(models) {
    // associations can be defined here
  };
  return festival;
};