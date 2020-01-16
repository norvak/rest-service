
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Users = require('../models/user');
const app = express();

app.get('/users', function (req, res) {

  let inic = req.query.inic || 0;
  inic = Number(inic);
  let final = req.query.final || 10;
  final = Number(final);


  Users.find({status:true}, 'name last_name rol email google status')
       .skip(inic)
       .limit(final)       
       .exec((err, users) => {

        if(err) {
          return res.status(400).json({
            ok:false,
            err
          });
        }
        Users.count({status:true}, (err, count) => {          
          res.json({
            ok:true,
            users,
            count: count
        });
    })
  })  
});
  
app.post('/users', function (req, res) {
 
  let body = req.body;
  let users = new Users({
      name: body.name,
      last_name: body.last_name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      role: body.role
  });


  users.save( (err, userDB) => {
      if(err) {
        return res.status(400).json({
          ok:false,
          err
        });
      }
      res.json({
         ok:true,
         user: userDB
      });
  });
});


app.get('/users/:id', function (req, res) {
 
  let id = req.params.id;
 
  Users.findById(id, (err, userDB) => {
     if(err) {
       return res.status(400).json({
         ok:false,
         err
       });
     }
      res.json({ 
        ok:true,
        user: userDB
      });
   });
});

app.put('/users/:id', function (req, res) {
 
  let id = req.params.id;
  let body = req.body;  

  Users.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
     if(err) {
       return res.status(400).json({
         ok:false,
         err
       });
     }
      res.json({ 
        ok:true,
        user: userDB
      });
   });
});

app.delete('/users/:id', function (req, res) {
 
  let id = req.params.id;
  let change = {
    status: false
  };

  Users.findByIdAndUpdate(id, change, {new: true}, (err, userDB) => {
     if(err) {
       return res.status(400).json({
         ok:false,
         err
       });
     }

     if(!userDB) {
       return res.status(400).json({
        ok: false,
        err: {
          message: 'User not exist'
        }
       });
     }
      res.json({ 
        ok:true,
        user: userDB
      });
   });
});

module.exports = app;