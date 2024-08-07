const fs = require('fs/promises');
const fsCallback = require('fs');
const path = require('path');
const { Account, Pet, Human, Shelter } = require('../models/models.js');
const petController = {};

// species: {type: String, required: true},
// breed: {type: String, required: true},
// name: {type: String, required: true },
// stats: Object,
// personality: String,
// picture: String,
// flagUsers: Object
petController.load = async (req, res, next) => {
  console.log('in pet load');
  try {
    const petId = req.params.id;
    const pet = await Pet.findById(petId);
    console.log(pet);
    res.locals.pet = pet;
    return next();
  } catch (err) {
    return next({ log: "error in petload: couldn't find pet" });
  }
};

// added by Tim 8/6/24
petController.getAnimals = async (req, res, next) => {
  console.log('getting animals');
  try {
    // const petId = req.params.id;
    // const pet = await Pet.findById(petId);
    // console.log(pet);
    // res.locals.pet = pet;
    return next();
  } catch (err) {
    return next({ log: "error in petload: couldn't find pet" });
  }
};
//called through the shelter router => will pass in shelterId
petController.createPet = async (req, res, next) => {
  // console.log('in add pet');
  console.log('picture:', req.file.filename);
  // console.log('req.body', req.body)
  try {
    //create newPet object
    const {
      about,
      species,
      breed,
      name,
      gender,
      age,
      weight,
      height,
      personality,
      shelterId,
    } = req.body;
    const stats = {
      age: typeof age === 'number' && age > 0 ? age : null,
      weight: typeof weight === 'number' && weight > 0 ? weight : null,
      height: typeof height === 'number' && height > 0 ? height : null,
    };

    console.log(
      about,
      species,
      breed,
      name,
      gender,
      age,
      weight,
      height,
      personality,
      stats,
      shelterId
    );
    const newPet = await Pet.create({
      species,
      breed,
      name,
      gender,
      stats,
      personality,
      about,
      picture: req.file.filename,
      flagUsers: [],
      //   stats: typeof stats === 'object' && stats !== null ? stats : {},
    });
    console.log('created pet');

    //add to shelter pet_ids array
    const shelter = await Shelter.findOneAndUpdate(
      { _id: shelterId },
      { $push: { pet_Ids: newPet.id } }
    );

    console.log(newPet, shelter);
    return next();
  } catch (err) {
    return next({
      log: 'pet creation error',
      message: { err: 'Error in createpet ' },
    });
  }
};

//called through the shelter router => will pass in shelterId and petId
//flowchart: insdie shelter container, when using a delete button on a specific pet, pass in the shelterId state and the respective pet.props.id through request body
petController.deletePet = async (req, res, next) => {
  const { shelterId, petId } = req.body;
  const errObj = {
    log: "couldn't find shelter or pet",
    message: { err: 'Error in deletepet' },
  };

  try {
    //remove petId from shelter's array of ids and delete pet
    const pet = await Pet.findById(petId);
    const flagUsers = pet.flagUsers;

    for (let i = 0; i < flagUsers.length; i++) {
      await Human.updateOne(
        { _id: flagUsers[i] },
        { $pull: { starredPets: pet.id } }
      );
    }
    //go throug pets human users and remove the petId from its starred
    const shelter = await Shelter.findOne({ _id: shelterId });
    await Shelter.updateOne({ _id: shelterId }, { $pull: { pet_Ids: pet.id } });
    await Pet.deleteOne({ _id: petId });

    console.log('deleted shelter', shelter);
    return next();
  } catch (err) {
    return next(errObj);
  }
};

//called through the human router => will pass in a humanId and petId in req.body
//flowchart: inside human container, use a shelterId and render through its petId list
// => in the cycle, if star button is clicked, call this router function and pass in current humanId state and current petId state through request body
petController.starPet = async (req, res, next) => {
  const { humanId, petId } = req.body;
  const errObj = {
    log: "couldn't find human or pet",
    message: { err: 'Error in starpet' },
  };

  try {
    //push the correct ids into human and pet
    const human = await Human.findOneAndUpdate(
      { _id: humanId },
      { $push: { starredPets: petId } }
    );
    const pet = await Pet.findOneAndUpdate(
      { _id: petId },
      { $push: { flagUsers: humanId } }
    );

    console.log(human, pet);
    res.locals.pet = pet;
    res.locals.human = human;
    return next();
  } catch (err) {
    return next(errObj);
  }
};

petController.unstarPet = async (req, res, next) => {
  const { humanId, petId } = req.body;
  const errObj = {
    log: "couldn't find human or pet",
    message: { err: 'Error in unstarpet' },
  };

  try {
    //pull from arrays in human and pet
    const human = await Human.findOneAndUpdate(
      { _id: humanId },
      { $pull: { starredPets: petId } }
    );
    const pet = await Pet.findOneAndUpdate(
      { _id: petId },
      { $pull: { flagUsers: humanId } }
    );

    console.log('unstar pet: ', human, pet);
    return next();
  } catch (err) {
    return next(errObj);
  }
};

module.exports = petController;
