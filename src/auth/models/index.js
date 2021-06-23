'use strict';

// 3rd party resources
const { Sequelize, DataTypes } = require('sequelize');

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

const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: users,
};
