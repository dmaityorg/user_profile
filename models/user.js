'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.hasOne(models.Profile, {
      foreignKey: 'user_id',
      as: 'profile',
    });
  };
  return User;
};