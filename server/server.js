const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000; //or whatever port ure using
const app = express();

const PORT = 3000;

// app.use(cors());
app.use(bodyParser.json());

// mongoose.coonect('' , {
//     useNewUrlParse: true,
//     useUnifiedTopology: true;
// }).then(() =>

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