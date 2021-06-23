'use strict';

// 3rd party resources
const supertest = require('supertest');

// imports
const { db } = require('../src/auth/models/index');
const { app } = require('../src/server');

// mock request
const request = supertest(app);

// setup
beforeAll( async () => {
  await db.sync();
});

// tear down
afterAll( async () => {
  await db.drop();
});

describe('server route testing', () => {
  test('returns user and 201 on POST to /signup', async () => {
    const userData = {
      username: 'cullenSharp',
      password: 'password',
    };

    const newRecord = await request.post('/signup').send(userData);

    expect(newRecord.body.username).toEqual('cullenSharp');
    expect(newRecord.status).toEqual(201);
  });

  test('returns user and 200 on POST to /signin with correct credentials', async () => {
    const signin = await request.post('/signin').auth('cullenSharp', 'password');

    expect(signin.status).toEqual(200);
  });

});


