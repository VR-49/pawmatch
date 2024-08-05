const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const port = 3000; //or whatever port ure using
const app = express();

const PORT = 3000;

const userRouter = require('./routes/userRouter.js');
const humanRouter = require('./routes/humanRouter.js');
const shelterRouter = require('./routes/shelterRouter.js');
const petRouter = require('./routes/petRouter.js');

// app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//serve route to images
app.use('/api/images', express.static(path.resolve(__dirname, './models/images')))



app.use('/api/auth', userRouter);
app.use('/api/human', humanRouter);
app.use('/api/shelter', shelterRouter);
app.use('/api/pet/', petRouter);

/**
 * 404 handler
 */
app.use('/', (req, res) => {
  res.status(404).send('URL Not Found');
});
    
    /**
     * Global error handler
     */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});