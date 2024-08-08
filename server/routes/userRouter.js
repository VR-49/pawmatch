const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const User = require('../models/models.js');
const userController = require('../controllers/userController.js');
const shelterController = require('../controllers/shelterController.js');
const humanController = require('../controllers/humanController.js');
const cookieController = require('../controllers/cookieController.js');

const router = express.Router();

//storage
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

// const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecretkey';
router.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../src/index.html'));
});

router.get('/verify', cookieController.verifyAuthCookie, (req, res) => {
  res.status(200).json()
})

//generic login on landing page
router.post('/signup', userController.signup, cookieController.setAuthCookie, (req, res) => {
  return res.status(200).json(res.locals.user);
  //inside the client side, after the fetch request we .then(data => if data.isOrg then fetch post shelter request else fetch post human request)
});

router.post('/login', userController.login, cookieController.setAuthCookie, (req, res) => {
  //console.log(res.locals);
  return res.status(200).json(res.locals);
});

router.get('/getDB', userController.getDB, (req, res) => {
  return res.status(200).json(res.locals.userDB);
});

router.post('/favorite', userController.favorite, (req, res) => {
  //console.log(res.locals);
  return res.status(200).json(res.locals);
});

router.get('/getFavorites', userController.getFavorites, (req, res) => {
  return res.status(200).json(res.locals.favorites);
});
// , code pulled from login
//   async (req, res, next) => {
//     if (res.locals.isOrg) { return shelterController.login(req, res, next); }
//     else { return humanController.login(req, res, next); }
//   },

router.delete('/delete/:username', userController.delete, (req, res) => {
  //console.log(res.locals.deleteMsg);
  return res.status(200).json(res.locals.deleteMsg);
});

module.exports = router;
