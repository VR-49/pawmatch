const fs = require('fs/promises');
const fsCallback = require('fs');
const path = require('path');
const { Account, Pet, Human, Shelter } = require('../models/models.js');
const { error } = require('console');

const userController = {};

userController.login = (req, res, next) => {
  const { username, password } = req.body;
  //console.log('in usercontroller login');
  Account.find({ username })
    .then((user) => {
      // console.log('found user', user[0]);
      // console.log(password, user[0].password);
      if (password === user[0].password) {
        console.log('corect password');
        res.locals.account = user;
        res.locals.username = username;
        res.locals.isOrg = user[0].isOrg;
        const result = {
          username: username,
          state: 'authorized'
        };
        res.locals.result = result;
        return next();
      } else return next({ 
        log: 'incorrect password',
        status: 400,
        message: 'incorrect password' });
    })
    .catch((err) => {
      return next({ 
        log: 'Account not found',
        message: 'Account not found' });
    });
};

userController.getDB = (req, res, next) => {
  Account.find({}).then((data) => {
    res.locals.userDB = data;
    return next();
  });
};

userController.signup = (req, res, next) => {
  //console.log('inside of signup middleware: ');
  const { username, password, email, isOrg } = req.body;
  //console.log('REQ BODY: ',req.body);
  //console.log('in usercontroller signup');
  Account.create({ username, password, email, isOrg })
    .then((user) => {
      res.locals.user = user.username;
      console.log('user is', user);
      return next();
    })
    .catch((err) => {
      if (err.code === 11000) {
        const error = {
          log: 'userController.signup username already exists: ' + err,
          status: 400,
          message: { err: 'Username already exists' },
        };
        next(error);
      } else {
        const error = {
          log: 'userController.signup error: ' + err,
          message: { err: 'Signup Failed' },
        };
        next(error);
      }
    });
};

userController.delete = async (req, res, next) => {
  //console.log('in user delete');
  try {
    const { username } = req.params;
    //const user = await Account.findOne({username})
    //const starredPets = user.starredPets;

    // for(let i = 0; i < starredPets.length; i++) {
    //   await Pet.updateOne( {_id: starredPets[i]}, {$pull: {flagUsers: user.id}});
    // }
    // await Pet.updateMany(
    //   {flagUsers:user._id},
    //   {$pull: {flagUsers: user._id}}
    // console.log('afterr find pet and delete')
    // );
    await Account.deleteOne({ username })
      .then((user) => {
        res.locals.deleteMsg = user;
        //console.log(user.deletedCount);
      })
      .catch((error) => {
        return next({
          log: 'userController.delete error: ' + error,
          status: 404,
          message: { err: 'Error in userController.delete' },
        });
      });
    return next();
  } catch (error) {
    return next({
      log: 'userController.delete error',
      message: { err: 'Error in userController.delete' },
    });
  }
};

userController.getDB = (req, res, next) => {
  Account.find({}).then((data) => {
    res.locals.userDB = data;
    return next();
  });
};

userController.favorite = (req, res, next) => {
  //console.log('inside of signup middleware: ');
  const { username, favorite } = req.body;
  //console.log('REQ BODY: ',req.body);
  //console.log('in usercontroller signup');
  console.log(favorite);
  Account.findOneAndUpdate(
    { username: username },
    {
      $push: {
        favorites: favorite,
      },
    }
  )
    .then((user) => {
      res.locals.favorites = user.favorites;
      console.log('favorite added', user);
      return next();
    })
    .catch((err) => {
      return next({
        log: err,
        status: 500,
        message: {
          err: 'An error occurred while trying to add to favorites in usercontroller',
        },
      });
    });
};

userController.getFavorites = (req, res, next) => {
  const { username } = req.body;
  //console.log('in usercontroller login');
  Account.findOne({ username: username })
    .then((user) => {
      res.locals.favorites = user.favorites;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'In userController: ' + err,
        status: 500,
        message: {
          err: 'An error occurred while trying to locate favorites of user',
        },
      });
    });
};

userController.deleteFavorite = (req, res, next) => {
  const { username, _id } = req.body;
  console.log('req.body: ', req.body);

  Account.findOne({ username: username })
    .then((user) => {
      user.favorites = user.favorites.filter(
        (fav) => fav.pet._id.toString() !== _id.toString()
      );
      return user.save();
    })
    .then(() => {
      res.locals.message = _id + ' has been deleted';
      console.log(res.locals);
      return next();
    })
    .catch((error) => {
      return next({
        log: 'userController.deleteFavorite error: ' + error,
        status: 404,
        message: { err: 'Error in userController.deleteFavorite' },
      });
    });
};

module.exports = userController;
