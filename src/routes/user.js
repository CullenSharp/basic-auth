'use strict';

// 3rd party resources
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// for debugging
// seems like something goes wrong with the imports, or setting up the model, maybe the naming... idk
// this works however
const data = require('../auth/models/index');
const {users} = require('../auth/models/index');
const sequelize = data.db;
const {DataTypes} = require('sequelize');

const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// middleware
const signIn = require('../auth/signin');


// sign-up route -- create a new user
router.post('/signup', signUp);
router.post('/signin', signIn, login);

async function signUp(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const record = await users.create(req.body);
    res.status(200).json(record);
  } catch(e) {
    res.status(403).send('error creating user');
  }
}

async function login(req, res) {
  const user = req.body.record;
  res.status(200).send(user);
}

module.exports = router;