const express = require('express');

const humanController = require('../controllers/humanController.js');
const petController = require('../controllers/petController.js');

const router = express.Router();
const multer = require('multer');
const path = require('path')

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

// const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecretkey';
router.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname,'../../src/index.html'))
})

//updating the bio page of human
router.post('/signup',
  upload.single('picture'), 
  humanController.signup,
  (req, res) => {
    return res.status(200).json(res.locals.human);
//inside the client side, after the fetch request we .then(data => if data.isOrg then fetch post shelter request else fetch post human request)
});

router.get('/login', 
  humanController.login, 
  (req, res) => {
    return res.status(200).json(res.locals.human);
});

// router.get('/render',
//   humanController.render,
//   (req, res) => {
//     return res.status(200).json(res.locals);
// });

router.post('/starpet',
  petController.starPet,
  (req, res) => {
    return res.status(200).json(res.locals);
});

router.delete('/unstarpet',
  petController.unstarPet,
  (req, res) => {
    return res.status(200).json(res.locals);
});

router.delete('/delete/:username',
  humanController.delete,
  (req,res)=>{
    return res.status(200).json(res.locals);
});

module.exports = router;