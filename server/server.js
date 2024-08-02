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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});