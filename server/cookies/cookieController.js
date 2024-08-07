const Account = require('../models/models');

cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.cookie('id: ', Math.floor(Math.random() * 100));
  console.log('in the cookie controller');
  return next();
};

// cookieController.setSSIDCookie = (req, res, next) => {
//     // write code here
//       console.log('inside setSSID ', res.locals.id);
//       res.cookie("ssid", res.locals.id, {httpOnly: true});
//       next();
//   };

module.exports = cookieController;
