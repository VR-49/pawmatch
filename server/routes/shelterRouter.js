const express = require('express');

const shelterController = require('../controllers/shelterController.js');
const petController = require('../controllers/petController.js');

const router = express.Router();

router.get('/', shelterController.getShelters, (req, res) => {
  return res.status(200).json(res.locals.shelter)
    console.log('in router')
})

//generic login on landing page
router.post('/signup', 
  shelterController.signup,
  (req, res) => {
    return res.status(200).json(res.locals.body);
});

router.get('/login', 
  shelterController.login, 
  (req, res) => {
    return res.status(200).json(res.locals);
});

router.post('/addpet',
  petController.createPet,
  (req, res) => {
    return res.status(200).json(res.locals);
});

router.delete('/deletepet',
  petController.deletePet,
  (req, res) => {
    return res.status(200).json(res.locals);
});

module.exports = router;