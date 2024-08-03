const fs = require('fs/promises');
const fsCallback = require('fs');
const path = require('path');
const { Account, Pet, Human, Shelter } = require('../models/models.js');

const humanController = {}
humanController.signup = (req, res, next) => {
  const { username, location, firstName, lastName, bio, picture } = req.body;
  console.log('in humancontroller signup');

  Human.create({username, location, firstName, lastName, bio, picture, pet_Ids: []})
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
        const {username} = res.locals.account[0];
        // console.log('account stuff:', username);
        // if(!username || !password){
        //     return restatus(400).json({
        //         error: 'wrong user'
        //     })
        // }
        //const match = await bcrypt.compare(password,user.password); <-swap after bcyrpt applied later O_O
        const human = await Human.findOne({username});
        if(!human){
            return res.status(400).json({
                error: 'shelter not found'
            });
        }
           res.locals.user = human;
           return next();
    } catch(err){
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


module.exports = humanController;