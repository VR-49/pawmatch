const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const User = require('../models/models.js');
const userController = require('../controllers/userController.js');

const router = express.Router();

// const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecretkey';
router.get('/', (req, res) => {
    console.log('in router')
})

//generic login on landing page
router.post('/signup', 
    userController.signup,
    // (req, res, next) => {
    //   if (res.locals.isOrg) {userController.createShelter;}    
    //   else {userController.createHuman;}
    //   return next()
    // },
    (req, res) => {
      return res.status(200).json(res.locals);
  });

router.post('/login', 
  userController.login, 
  (req, res) => {
    return res.status(200).json(res.locals);
});


module.exports = router;