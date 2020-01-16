
const express = require('express');
const bcrypt = require('bcrypt');

const Users = require('../models/user');
const app = express();


app.post('/login', function (req, res) {
 
   let body = req.body;

    Users.findOne({email:body.email}, (err, userDB) => {
      if(err) {
        return res.status(500).json({
          ok:false,
          err
        });
      }

      if(!userDB) {
        return res.status(400).json({
            ok:false,
            err: {
                message: 'User or Password invalid'
            }
        });
      }
      
      if(bcrypt.compareSync(body.password, userDB.password)){
        return res.status(400).json({
            ok:false,
            err: {
                message: 'User or Password invalid'
            }
        });
      }

      res.json({
        ok:true,
        user: userDB,
        token: '123'
     });
    })
});

module.exports = app;