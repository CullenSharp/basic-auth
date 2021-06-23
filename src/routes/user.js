'use strict';

// 3rd party resources
const express = require('express');
const router = express.Router();

// import tables
const {users} = require('../auth/models/index');


// middleware
const auth = require('../auth/auth');


// sign-up route -- create a new user
router.post('/signup', signUp);
router.post('/signin', auth, login);

async function signUp(req, res) {
  try {
    const record = await users.create(req.body);
    res.status(201).json(record);
  } catch(e) {
    res.status(403).send('error creating user');
  }
}

async function login(req, res) {
  const user = req.body.record;
  res.status(200).send(user);
}

module.exports = router;