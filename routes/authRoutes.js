const express = require('express');
const Router = express.Router();

const Users = require('../knex/models/Users.js')
const Passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');


Passport.serializeUser((user, done) => {
  done(null, user.id);
})

Passport.deserializeUser((user, done) => {
  Users
    .where({ id: user.id })
    .fetch()
    .then(user => {
      user = user.toJSON();
      done(null, user)
    })
    .catch(err => {
      return done(err)
    })
})

// CONFIGURATION TO VERIFY CALLBACK FOR LOCAL AUTHENTICATION
Passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
  Users
    .where({ username })
    .fetch()
    .then(user => {
      // user = user.toJSON();
      console.log('fuckkkkk: ', user);

      bcrypt.compare(password, user.attributes.password)
        .then(result => {
          console.log('RESSSS: ', result);
          console.log('pass: ', password);
          console.log('user.att: ', user.attributes.password);
          if (result) {
            console.log('asdf ', user);
            done(null, user)
          } else {
            done(null, false)
          }
        })
        .catch(err => {
          done(null, false)
        })
    })
    .catch(err => {
      console.log(err);
    })
}));

// Passport.use(new LocalStrategy(function (username, password, done) {
//   return new Users({ username: username })
//     .fetch()
//     .then(user => {
//       if (user === null) {
//         return done(null, false, { message: 'bad username or password' });
//       } else {
//         user = user.toJSON();
//         bcrypt.compare(password, user.password)
//           .then(samePassword => {
//             if (samePassword) { return done(null, user); }
//             else {
//               return done(null, false, { message: 'bad username or password' });
//             }
//           })
//       }
//     })
//     .catch(err => {
//       return done(err);
//     });
// }));

//USE BCRYPT TO SALT THE PASSWORDS SO THEY ARE NOT VISABLE
const SALT_ROUND = 10

//RENDERS THE USER REGISTRATION FORM
Router.get('/auth/register', (req, res) => {
  res.render('./auth/register');
});

//POSTS THE USER REGISTRATION DATA TO DB AND REDIRECTS TO GALLERY
Router.post('/auth/register', (req, res) => {
  const { email, username, password } = req.body;

  bcrypt.hash(password, 10)
    .then(salt => {
      return bcrypt.hash(password, salt)
    })
    .then(hash => {
      return Users
        .forge({ email, username, password: hash })
        .save()
    })
    .then(user => {
      user = user.toJSON()
      console.log('user: ', user);
      // res.json(user) //What exactly does this do??
      // res.sendStatus(200) //What 
      res.redirect('/')
    })
});

Router.get('/auth/login', (req, res) => {
  res.render('./auth/login');
});

Router.post('/auth/login', Passport.authenticate('local', {
  successRedirect: '/',
  // failureRedirect: '/auth/login',
  // failureFlash: true
}), (req, res) => {
})

// Router.post('/auth/login', (req, res, next) => {
//   console.log('login get', req.body)
//   // req.body.username = req.body.username.toLowerCase();
//   Passport.authenticate('local', (err, user, info) => {
//     console.log('user: ', user)
//     if (err) {
//       req.flash('error', `wrong username or password`);
//       return res.redirect('/auth/login')
//     } else if (!user) {
//       req.flash('error', `wrong username or password`);
//       return res.redirect('/auth/login')
//     } else if (req.body.username < 1 || req.body.password.length < 1) {
//       req.flash('error', `wrong username or password`);
//       return res.redirect('/auth/login')
//     }
//     req.login(user, (err) => {
//       if (err) { return next(err); }
//       return res.redirect('/');
//       // return res.json({ success: true })
//     });
//   })(req, res, next);
// });



module.exports = Router;