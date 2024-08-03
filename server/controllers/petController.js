// const fs = require('fs/promises');
// const fsCallback = require('fs');
// const path = require('path');
// const { Account, Pet, Human, Shelter } = require('../models/models.js');
// const petController = {}
// // petController.createPet = async (req, res, next) => {
// //     try {
// //         const { stats, personality, picture, flagUsers } = req.body;
// //         const newPet = await Pet.create({ 
// //             stats: typeof stats === 'object' && stats !== null ? stats : {}, 
// //             personality, picture, 
// //             flagUsers: typeof flagUsers === 'object' && flagUsers !== null ? flagUsers : {} 
// //         });
// const shelter = await Shelter.findById(shelterId);
// if (shelter) {
//   shelter.pet_Ids.push(newPet._id);
//   await shelter.save();
// }
// //         res.status(201).json(newPet);
//       } catch(err){
//         return next({
//             log: 'petcreation error',
//             message: { err: 'Error in createpet '}
//         });
//   };
// }



// module.exports = petController;

  
  