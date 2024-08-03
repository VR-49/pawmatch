const fs = require('fs/promises');
const fsCallback = require('fs');
const path = require('path');
const { Account, Pet, Human, Shelter } = require('../models/models.js');

const userController = {}

userController.login = (req, res, next) => {
  const { username, password } = req.body;

  
  console.log('in usercontroller login');
  Account.find({ username })
  .then(user => {
    console.log('found user');
    if (password === user.password) return next();
    else return next({message: 'incorrect username or password'});
  })
  .catch(err => {
    return next(err);
  })
}

userController.signup = (req, res, next) => {
  const { username, password, email, isOrg } = req.body;

  console.log('in usercontroller signup');
  Account.create({username, password, email, isOrg})
  .then((user) => {
    res.locals.body = req.body;
    // res.locals.isOrg = isOrg;
    console.log(user);
    return next();
  })
  .catch(err => {
    return next(err);
  }
  )
}

// userController.createShelter = (req, res, next) => {
//   const { username, password, email, isOrg } = res.locals.body;
  
//   Shelter.create({ })

// }



module.exports = userController;
