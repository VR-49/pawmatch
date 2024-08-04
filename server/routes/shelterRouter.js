const express = require('express');

const shelterController = require('../controllers/shelterController.js');
const multer = require('multer');
const path = require('path')
const petController = require('../controllers/petController.js');

const router = express.Router();

//storage
const Storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, path.resolve(__dirname, '../models/images'))
  },
  filename:(req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  }
});
const upload = multer({
  storage: Storage
})

//storage
const Storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, path.resolve(__dirname, '../models/images'))
  },
  filename:(req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  }
});
const upload = multer({
  storage: Storage
})

router.get('/', shelterController.getShelters, (req, res) => {
  return res.status(200).json(res.locals.shelter)
    console.log('in router')
})

//generic login on landing page
router.post('/signup', 
    upload.single('picture'),
    shelterController.signup,
    (req, res) => {
      return res.status(200).json(res.locals.message);
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