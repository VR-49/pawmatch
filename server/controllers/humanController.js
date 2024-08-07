const fs = require('fs/promises');
const fsCallback = require('fs');
const path = require('path');
const { Account, Pet, Human, Shelter } = require('../models/models.js');
const apiController = require('./apiController');

const humanController = {};

humanController.getDB = (req, res, next) => {
  Human.find({})
  .then((found) => {
    res.locals.humanDB = found;
    next();
  })
  .catch(error => {
    const err = {
      log: 'humanController.getDB grab data issue: ' + error,
      status: 500,
      message: { err: 'DB grab data error' }
    };
    next(err);
  })
};

humanController.signup = (req, res, next) => {
  const { username, location, firstName, lastName, bio, picture } = req.body;
  console.log('in humancontroller signup');

  Human.create({username, location, firstName, lastName, bio, picture: req.file.filename, starredPets: []})
  .then((user) => {
    res.locals.body = req.body;
    console.log(user);
    return next();
  })
  .catch(err => {
    err.message = 'invalid paramters in sheltercontroller';
    return next(err);
  })
};
  
humanController.login = async (req, res, next)=>{
    console.log('in humancontroller login');
    try{
      const username = res.locals.username;
      // await apiController.getGeoLocation(req, res, next, async (err) =>{
      //   if(err)return next (err);
      //   const {lat, lng} = req.geolocation;

      const human = await Human.findOne({username});
      if(!human){
        return res.status(400).json({
          error: 'human not found'
        });
      }
        // human.location = `Lat : ${lat}, Lng: ${lng}`;
        // await human.save();

      res.locals.user = human;
      return next();
      }
     catch(err){
      return next({
          log: 'humanctonroller.loign error ',
          message: { err: 'Error in human controler login'}
      });
    }
  }

  // humanController.starPets = async (req, res, next) => {
  //   try {
  //     const { userId, petIds } = req.body;
  //     const user = await Human.findById(userId);
  //     if (!user) {
  //       return res.status(404).json({ error: 'User not found' });
  //     }
  // //     user.pet_Ids = [...new Set([...user.pet_Ids, ...petIds])]; 
  
  // //     await user.save();
  // await petController.updateUserWithPets(userId, petIds);
  //     res.status(200).json(user);
  //   } catch (error) {
  //     return next(error);
  //   }
  // };
  humanController.delete = async (req,res,next) =>{
    console.log('in human delete');
    try {
      const {username} = req.params;
      const user = await Human.findOne({username})
      const starredPets = user.starredPets;

      for(let i = 0; i < starredPets.length; i++) {
        await Pet.updateOne( {_id: starredPets[i]}, {$pull: {flagUsers: user.id}});
      }
        // await Pet.updateMany(
        //   {flagUsers:user._id},
        //   {$pull: {flagUsers: user._id}}
        console.log('afterr find pet and delete')
        // );
      await Human.deleteOne({username});

      return next();
    } catch(error){
        return next({
          log: 'humanController.delete error',
          message:{err: 'Error in humanController.delete'}
        });

    }
  }


module.exports = humanController;