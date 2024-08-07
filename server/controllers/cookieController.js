const Account = require('../models/models');
const jwt = require('jsonwebtoken');

cookieController = {};

cookieController.setCookie = (req, res, next) => {
  const payload = {
    username: res.locals.username
  };
  const token = jwt.sign(payload, 'a_shitty_secret', {
    expiresIn: '30s',
  });
  res.cookie(token);
};

// cookieController.setSSIDCookie = (req, res, next) => {
//     // write code here
//       console.log('inside setSSID ', res.locals.id);
//       res.cookie("ssid", res.locals.id, {httpOnly: true});
//       next();
//   };

module.exports = cookieController;
