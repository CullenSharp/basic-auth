'use strict';

// 3rd party resources
require('dotenv').config();

// import server and db
const server = require('./src/server');
const { db } = require('./src/auth/models/index');

// load environment variables
const PORT = process.env.PORT || 3001;

// create tables, then start upp http server
db.sync()
  .then(server.start(PORT))
  .catch(e => {
    console.error('Could not start server', e.message);
  });
