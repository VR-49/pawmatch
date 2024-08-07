const fs = require('fs/promises');
const fsCallback = require('fs');
const path = require('path');
const { Account, Pet, Human, Shelter } = require('../models/models.js');
const { error } = require('console');

const userController = {}

userController.login = (req, res, next) => {
  const { username, password } = req.body;
  //console.log('in usercontroller login');
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

userController.getDB = (req, res, next) => {
  Account.find({})
  .then((data) => {
    res.locals.userDB = data;
    return next();
  })
  
}

userController.signup = (req, res, next) => {
  //console.log('inside of signup middleware: ');
  const { username, password, email, isOrg } = req.body;
  //console.log('REQ BODY: ',req.body);
  //console.log('in usercontroller signup');
  Account.create({username, password, email, isOrg})
  .then(user => {
    res.locals.user = user;
    console.log('user is', user);
    return next();
  })
  .catch(err => {
    const error = {
      log: 'userController.delete error: ' + err,
      message:{err: 'Error in userController.delete'}
    };
    next(error);
  });
}

userController.delete = async (req,res,next) =>{
  //console.log('in user delete');
  try {
    const {username} = req.params;
    const user = await Account.findOne({username})
    //const starredPets = user.starredPets;

    // for(let i = 0; i < starredPets.length; i++) {
    //   await Pet.updateOne( {_id: starredPets[i]}, {$pull: {flagUsers: user.id}});
    // }
      // await Pet.updateMany(
      //   {flagUsers:user._id},
      //   {$pull: {flagUsers: user._id}}
      // console.log('afterr find pet and delete')
      // );
    await Account.deleteOne({username});

    return next();
  } catch(error){
      return next({
        log: 'userController.delete error',
        message:{err: 'Error in userController.delete'}
      });
  }
}

module.exports = userController;
