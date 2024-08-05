const fs = require('fs/promises');
const fsCallback = require('fs');
const path = require('path');
const { Account, Pet, Human, Shelter } = require('../models/models.js');

const humanController = {}
humanController.signup = (req, res, next) => {
  const { username, location, firstName, lastName, bio, picture } = req.body;
  console.log('in humancontroller signup');

  Human.create({username, location, firstName, lastName, bio, picture: req.file.filename, starredPets: []})
  .then((human) => {
    res.locals.human = human;
    console.log(human);
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
    const { username } = req.query //NEW
    // const {username} = res.locals.account;
    // console.log('account stuff:', username);
    // if(!username || !password){
    //     return restatus(400).json({
    //         error: 'wrong user'
    //     })
    // }
    //const match = await bcrypt.compare(password,user.password); <-swap after bcyrpt applied later O_O
    const human = await Human.findOne({username});

    res.locals.human = human;
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