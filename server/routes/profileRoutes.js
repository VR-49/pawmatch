const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const profileController = require('../controllers/profileController');

// Set the destinate and filename that will be used for Multer
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../models/images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});

// Get profile data
router.get('/profile', profileController.getProfile);

// Attach profile picture and update profile
router.put('/profile', upload.single('photo'), profileController.updateProfile);

module.exports = router;
