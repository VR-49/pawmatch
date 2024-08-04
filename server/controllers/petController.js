const fs = require('fs/promises');
const fsCallback = require('fs');
const path = require('path');
const { Account, Pet, Human, Shelter } = require('../models/models.js');
const petController = {}

// species: {type: String, required: true},
// breed: {type: String, required: true},
// name: {type: String, required: true },
// stats: Object,
// personality: String,
// picture: String,
// flagUsers: Object

const findIndex = (arr, obj) => {
  for (let i = 0; i < arr.length; i++)
    if (JSON.stringify(arr[i]) === JSON.stringify(obj)) return i;

  return -1;
}

//called through the shelter router => will pass in shelterId
petController.createPet = async (req, res, next) => {
  console.log('in add pet');
  try {
    //create newPet object
    const { species, breed, name, gender, age, weight, height, personality, picture, shelterId } = req.body;
    console.log('age', age, typeof age);
    console.log('weight', weight, typeof weight);
    console.log('height', height, typeof height);
    const stats = {
        age: (typeof age === 'number' && age > 0) ? age : null,
        weight: (typeof weight === 'number' && weight > 0) ? weight : null,        
        height: (typeof height === 'number' && height > 0) ? height : null,
    }
    const newPet = await Pet.create({ 
      species, breed, name, gender, stats, personality, picture, flagUsers: [],
    //   stats: typeof stats === 'object' && stats !== null ? stats : {}, 
    });

    //add to shelter pet_ids array    
    const shelter = await Shelter.findOneAndUpdate({_id: shelterId}, { $push: { pet_Ids: newPet._id } });

    console.log(newPet, shelter);
    return next();
  } catch(err){
    return next({
      log: 'pet creation error',
      message: { err: 'Error in createpet '}
    });
  };
}

//called through the shelter router => will pass in shelterId and petId
//flowchart: insdie shelter container, when using a delete button on a specific pet, pass in the shelterId state and the respective pet.props.id through request body
petController.deletePet = async (req, res, next) => {
  const {shelterId, petId} = req.body;
  const errObj = {
    log: 'couldn\'t find shelter or pet',
    message: { err: 'Error in deletepet' },
  };

  try{ 
    const shelter = await Shelter.findById(shelterId);
    const pet = await Pet.findById(petId);

    //remove petId from shelter's array of ids and delete pet
    if (shelter && pet) {
      const indexOfPet = shelter.pet_Ids.indexOf(pet._id);

      if (indexOfPet !== -1){
        shelter.pet_Ids.splice(indexOfPet, 1);
        await shelter.save();
      } else return next(errObj);

      await Pet.deleteOne({ _id: petId });
    }
    else return next(errObj); 
  }
  catch (err) { return next(errObj); }
}

//called through the human router => will pass in a humanId and petId in req.body
//flowchart: inside human container, use a shelterId and render through its petId list
// => in the cycle, if star button is clicked, call this router function and pass in current humanId state and current petId state through request body
petController.starPet = async (req, res, next) => {
  const {humanId, petId} = req.body;
  const errObj = {
    log: 'couldn\'t find human or pet',
    message: { err: 'Error in starpet' },
  };

  try {
    const human = await Human.findOneAndUpdate({_id: humanId}, { $push: { starredPets: petId } });
    const pet = await Pet.findOneAndUpdate({_id: petId}, { $push: { flagUsers: humanId } });

    console.log(human, pet);
    res.locals.pet = pet; res.locals.human = human;
    return next();
  } 
  catch (err) { return next(errObj); }
}

petController.unstarPet = async (req, res, next) => {
  const {humanId, petId} = req.body;
  const errObj = {
    log: 'couldn\'t find human or pet',
    message: { err: 'Error in unstarpet' },
  }
  
  try {
    const pet = await Pet.findById(petId);
    const human = await Human.findById(humanId);
    
    //get indexes in respective arrays (using delcared function above)
    const indexOfHuman = findIndex(human.pet_Ids, { petId: petId, petName: pet.name });
    const indexOfPet = findIndex(pet.flagUsers, {humanId: humanId, humanUsername: human.username});

    //update flagId in pet and add the humanId
    if (indexOfHuman !== -1 && indexOfPet !== -1) {
      human.pet_Ids.splice(indexOfHuman, 1);
      await human.save();

      pet.flagUsers.splice(indexOfPet, 1);
      await pet.save();

      res.locals.pet = pet; res.locals.human = human;
      return next();
    } 

    else return next(errObj);
  } 
  catch (err) { return next(errObj); }

}



module.exports = petController;

  
  