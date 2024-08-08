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
  try{
    //console.log(req.cookies.jwt);
    jwt.verify(req.cookies.jwt, 'a_shitty_secret');
    console.log('valid token');
    res.locals.jwt = 'valid';
    next();
  }
  catch (err) {
    //console.log(err);
    if(err.name === 'TokenExpiredError'){
      const error = {
        log: 'cookieController.verifyAuthCookie token expired: ',
        status: 401,
        message: 'expired'
      };
      next(error);
    }
    else{
      const error = {
        log: 'cookieController.verifyAuthCookie invalid token or missing token: ',
        status: 401,
        message: 'invalid'
      };
      next(error);
    }
    //console.log(err);
  }
};

module.exports = cookieController;
