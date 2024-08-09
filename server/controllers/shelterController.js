const fs = require('fs/promises');
const fsCallback = require('fs');
const path = require('path');
const { Account, Pet, Human, Shelter } = require('../models/models.js');



const shelterController = {}

shelterController.getShelters = (req, res, next) => {
  Shelter.find({})
    .then(shelter => {
      res.locals.shelter = shelter;
      return next();
    })
    .catch((error) => {
      const err = {
        log: 'shelterController.getShelters grab data issue: ' + error,
        status: 500,
        message: { err: 'DB grab data error' }
      };
      next(err);
    });
}

shelterController.getPetDB = (req, res, next) => {
  Pet.find({})
  .then((found) => {
    res.locals.petDB = found;
    next();
  })
  .catch(error => {
    const err = {
      log: 'petController.getDB grab data issue: ' + error,
      status: 500,
      message: { err: 'DB grab data error' }
    };
    next(err);
  })
};

shelterController.load = async (req, res, next) => {
  console.log('in pet load');
  try {
    const petId = req.params.id;
    const pet = await Pet.findById(petId);
    console.log(pet);
    res.locals.pet = pet;
    return next();
  }
  catch(err){
    return next({log: "error in petload: couldn't find pet"})
  }
}
shelterController.addShelter = (req, res, next) => {
  //files are in req.file NOT body
  // console.log('file', req.file)
  const { username, location, orgName, bio } = req.body;
  //console.log('in sheltercontroller signup');

  //in order to pull up images take the image name and find in images
  Shelter.create({username, location, orgName, bio, pet_Ids: []})
  .then((shelter) => {
    res.locals.shelterDB = shelter;
    console.log(shelter);
    return next();
  })
  .catch(error => {
    const err = {
      log: 'shelterController.addShelters invalid data issue: ' + error,
      status: 400,
      message: { err: 'Invalid Response' }
    };
  })
};
  
// shelterController.login = async (req, res, next) => {
//   console.log('in sheltercontroller login');
//   try {
//     const username = res.locals.username; 
//     console.log('shelter username', username);
//     const shelter = await Shelter.findOne({username});

    
//     res.locals.shelter = shelter;
//     return next();
//   } catch(err){
//     return next({
//       log: 'shelterctonroller.login error ',
//       message: { err: 'Error in shelter controler login'}
//     });
//   }
// }

// const deletePets = async (petId) => {
//   const pet = await Pet.findById(petId);
//   const flagUsers = pet.flagUsers;

//   //removes corresponding petId from all appropriate human users
//   for (let i = 0; i < flagUsers.length; i++){
//     await Human.updateOne( {_id: flagUsers[i]}, {$pull: {starredPets: pet.id}});
//   }
//   //deletes itself
//   await Pet.deleteOne({ _id: petId });
// }


// shelterController.delete = async (req, res, next) => {
//   console.log('in sheltercontroller delete');

//   try {
//     const {username} = req.params;
//     const user = await Shelter.findOne({username})
//     const pet_Ids = user.pet_Ids;

//     for(let i = 0; i < pet_Ids.length; i++) {
//       await deletePets(pet_Ids[i]);
//     }

//     await Shelter.deleteOne({username});
//     return next();
//   } 
//   catch(error){
//     return next({
//       log: 'shelterController.delete error',
//       message:{err: 'Error in shelterController.delete'}
//     });
//   }
// }

module.exports = shelterController; 