'use strict';

// 3rd party resources
const bcrypt = require('bcrypt');
const base64 = require('base-64');

// models
const Users = require('./models/user');

// smells wrong
module.exports = async (req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await Users.findOne({ where: { username: username }});
    const valid = await bcrypt.compare(password, user.password);
    if(valid) {
      req.body.record = user;
      next();
    }
    else {
      throw new Error('invalid user');
    }
  } catch(e) {
    next(e);
  }
};