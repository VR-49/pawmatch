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
    // console.log('found user', user[0]);
    // console.log(password, user[0].password);
    if (password === user[0].password) {
      console.log('corect password');
      res.locals.account = user;
      res.locals.username = username;
      res.locals.isOrg = user[0].isOrg;
      return next();
    }
    else return next({message: 'incorrect username or password'});
  })
  .catch(err => {
    return next({message: 'incorrect username'});
  })
}

userController.signup = (req, res, next) => {
  console.log('inside of signup middleware: ', req.body)
  const { username, password, email, isOrg } = req.body;

  console.log('in usercontroller signup');
  Account.create({username, password, email, isOrg})
  .then((user) => {
    res.locals.user = user;
    console.log('user is', user);
    return next();
  })
  .catch(err => {
    return next(err);
  }
  )
}

module.exports = userController;
