'use strict';

// 3rd party resources
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../auth/models/index');

// middleware
const signIn = require('../auth/signin');


// sign-up route -- create a new user
router.post('/signup', signUp);
router.post('/signin', signIn, login);

async function signUp(req, res) {
  try {
    console.log('hello');
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log(req.body.password);
    const demoData= {
      username: 'cullenSharp',
      password: 'xxtestxx',
    };

    const record = await data.user.create(demoData);
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