const express = require('express');
const humanController = require('../controllers/humanController.js');
const petController = require('../controllers/petController.js');
const apiController = require('../controllers/apiController.js'); // Import apiController

const router = express.Router();
const multer = require('multer');
const path = require('path')


//rotue for geolocaiotn
router.post('/geolocation', apiController.getGeolocation, (req, res) => {
    res.status(200).json(res.locals.geolocation);
  });
  
  router.post('/geocode', apiController.geoCodeMiddleware, (req, res) => {
    res.status(200).json(res.locals);
    // res.send({
    //     address: req.body.address,
    //     geolocation: req.geolocation
    // });
});

  module.exports = router;