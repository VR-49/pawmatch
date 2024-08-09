const express = require('express');

const petController = require('../controllers/petController.js');

const router = express.Router();

router.get('/getDB', petController.getDB, (req, res) => {
  res.status(200).json(res.locals.petDB);
});

router.get('/:id', 
    petController.load,
    (req, res) => {
    res.status(200).json(res.locals)
})


module.exports = router;