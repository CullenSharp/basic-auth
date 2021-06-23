'use strict';

// middleware for testing
const auth = require('../src/auth/auth');

// setup request for mock
const { db, users } = require('../src/auth/models/index');

const userInfo = {
  username: 'cullenSharp',
  password: 'password',
};

beforeAll(async (done) => {
  await db.sync();
  await users.create(userInfo);

  done();
});

afterAll(async (done) => {
  await db.drop();

  done();
});

const req = {
  body: {},
};
const res = {
  status: jest.fn(() => res),
  res: jest.fn(() => res),
};
const next = jest.fn();


describe('Auth middleware testing', () => {
  test('Should call next on successful authentication', () =>{
    req.headers = {
      authorization: 'Basic Y3VsbGVuU2hhcnA6cGFzc3dvcmQ=',
    };

    return auth(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith();
      });
  });
});