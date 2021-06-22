'use strict';

// 3rd party resources
const express = require('express');
const cors = require('cors');

// prepare express app
const app = express();
app.use(cors());

// routes
const userRoutes = require('./routes/user');

// process JSON input and put the data on req.body
app.use(express.json());

// process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

app.get('*', (req, res) => {
  res.status(404).send('Invalid route');
});

module.exports = {
  app: app,
  start: (PORT) => app.listen(PORT, console.log(`Alert, Awake, Alive on ${PORT}`)),
};