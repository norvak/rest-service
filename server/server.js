
require('./config/config.js');

const express = require('express');
const mongoose = require('mongoose');
 
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
  
// parse application/json
app.use(bodyParser.json());


app.use(require('./routes/index'));


mongoose.connect('mongodb://localhost:27017/curso', (err,res) => {
  if( err ) throw err;
  console.log('Conecction DataBase');
});
 
app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto', process.env.PORT);
})