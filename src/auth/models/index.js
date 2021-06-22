'use strict';

// 3rd party resources
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// models
const userModel = require('./user');

// environment variables
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const NODE_ENV = process.env.NODE_ENV;

// connect to db
let sequelize = new Sequelize(DATABASE_URL, NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {});

const user = userModel(sequelize, DataTypes);

user.beforeCreate(async (user, options) => {
  user.password = await bcrypt.hash(user.password);
});

module.exports = {
  db: sequelize,
  user,
};
