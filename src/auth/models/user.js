'use strict';

// Sequelize model for users
const User = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = User;