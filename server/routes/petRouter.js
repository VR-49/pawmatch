const express = require('express');

const petController = require('../controller/petController.js');

const router = express.Router();

// router.get('/', (req, res) => {
//     res.status(200).sendFile(path.resolve(__dirname,'../../src/index.html'))
// })
// router.post('/create', petController.createPet)


module.exports = router;