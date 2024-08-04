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
}

shelterController.signup = (req, res, next) => {
  const { username, location, orgName, bio,  picture } = req.body;
  console.log('in sheltercontroller signup');

  Shelter.create({username, location, orgName, bio, picture, pet_Ids: []})
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
  
shelterController.login = async (req, res, next)=>{
    console.log('in sheltercontroller login');
    try{
        const { username } = req.query; //NEW
        // const {username} = res.locals.account;
        // console.log('account stuff:', username);
        // if(!username || !password){
        //     return restatus(400).json({
        //         error: 'wrong user'
        //     })
        // }
        //const match = await bcrypt.compare(password,user.password); <-swap after bcyrpt applied later O_O
        const shelter = await Shelter.findOne({username});
        if(!shelter){
            return res.status(400).json({
                error: 'shelter not found'
            });
        }
            // console.log(shelter);
          //  res.locals = {shelter};
           res.locals.user = shelter;
           return next();
    } catch(err){
      return next({
          log: 'shelterctonroller.loign error ',
          message: { err: 'Error in shelter controler login'}
      });
    }
  }


module.exports = shelterController; 