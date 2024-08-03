const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000; //or whatever port ure using
const app = express();

const PORT = 3000;

const userRouter = require('./routes/userRouter.js');
const humanRouter = require('./routes/humanRouter');
const shelterRouter = require('./routes/shelterRouter');

// app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', userRouter);
app.use('/human', humanRouter);
app.use('/shelter', shelterRouter);

/**
 * 404 handler
 */
app.use('/', (req,res) => {
  res.status(404).send('Not Found');
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