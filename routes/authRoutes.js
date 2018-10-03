const express = require('express');
const Router = express.Router();
const Users = require('../knex/models/Users.js')
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const bcrypt = require('bcrypt');



Router.post('/register', (req, res) => {
  // const { email, username, password } = req.body;
  const info = req.body;
  newInfo = info;
  const postObj = {
    email: newInfo.email,
    username: newInfo.username,
    password: newInfo.password
  }
  console.log('req.body: ', postObj);
  Users
    .forge(postObj)
    .save()
    .then(result => {
      if (result) {
        res.send('new user made');
      } else {
        res.send('error making user');
      }
    })
    .catch(err => {
      res.json(err);
    })
});

Router.post('/login', (req, res) => {

});

Router.post('/logout', (req, res) => {

});

Router.get('/protected', (req, res) => {
  res.send('protected')
})







module.exports = Router;