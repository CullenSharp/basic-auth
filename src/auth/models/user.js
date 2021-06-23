'use strict';

// 3rd party resources
const bcrypt = require('bcrypt');

// Sequelize model for users
const User = (sequelize, DataTypes) => {
  let model = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  model.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return model;
};

module.exports = User;