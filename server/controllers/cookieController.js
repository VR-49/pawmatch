const Account = require('../models/models');
const jwt = require('jsonwebtoken');

cookieController = {};

cookieController.setAuthCookie = (req, res, next) => {
  const cookies = req.cookies;
  //console.log(req.cookies);
  for (let cookie in cookies) {
    if (cookies.hasOwnProperty(cookie)) {
        res.clearCookie(cookie);
    }
  }
  const payload = {
    username: res.locals.username
  };
  const token = jwt.sign(payload, 'a_shitty_secret', {
    expiresIn: '30s',
  });
  //console.log('jwt=' + token);
  res.cookie('jwt', token);
  next();
};

cookieController.verifyAuthCookie = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token);
};

module.exports = cookieController;
