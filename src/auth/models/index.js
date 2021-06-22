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

const users = userModel(sequelize, DataTypes);

// this might be the problem here. maybe it goes someplace else?
// this hook is confirmed the problem
users.beforeCreate(async (users, options) => {
  console.log('hello');
  console.log(users.password);
  console.log(users);
  users.password = await bcrypt.hash(users.password);
});

module.exports = {
  db: sequelize,
  users: users,
};
