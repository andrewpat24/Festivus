'use strict';
module.exports = (sequelize, DataTypes) => {
  var festivals = sequelize.define('festivals', {
    name: DataTypes.STRING,
    show_url: DataTypes.STRING,
    location: DataTypes.STRING,
    date_span: DataTypes.STRING,
    bio: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {});
  festivals.associate = function(models) {
    // associations can be defined here
  };
  return festivals;
};