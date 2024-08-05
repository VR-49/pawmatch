
const fs = require('fs/promises');
const fsCallback = require('fs');
const path = require('path');
const { Account, Pet, Human, Shelter } = require('../models/models.js');
const apiController = {};
const axios = require('axios');
// const apikey = require('../../apikey.js/apikeys.js'); 
//need to npm install axios  ^

//gelocaiotn method
apiController.getGeolocation = async (req,res,next)=>{
    console.log(`before fetc`)
    try{
        // const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apikey}`, {
      const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDscQ4SaGq_K2hODzPjKrNIySWcf36tcGY`, {
            method: 'POST',
    });
    const data = await response.json();
    const {location} = data;
    const {lat,lng } = location;
    req.geolocation = { lat, lng };
    res.locals.geolocation = { lat, lng };
    console.log(`after fetch`)
    return next();
}catch(error){
  return next({
        log: 'apiController.getGeolocation error',
        message: { err: 'Error in apiController.getGeolocation'}
    });
  }
}
apiController.geoCodeMiddleware = async (req, res, next) => {
  const address = req.body.address;

  
  if (!address) {
    return next({ 
      log: 'error address not found',
      message: {err : 'Error while retriveing address'}
     });
}

try {
    ;
    console.log
    const response = await axios.get(``, {
        params: {
            address: address,
            key: apiKey
        }
    });

    if (response.data.status !== 'OK') {
        return next ({ error: 'Unable to geocode address' });
    }

    const location = response.data.results[0].geometry.location;
    req.geolocation = location;
    return next();
} catch(error) {
  return next({
    log: 'apicontroller.geocodeMiddeleware error',
    message: { err: 'gelolcation middelware'}
});
};
}

module.exports = apiController;

