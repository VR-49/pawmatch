const express = require('express');

const shelterController = require('../controllers/shelterController.js');

const router = express.Router();

router.get('/', (req, res) => {
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


module.exports = router;