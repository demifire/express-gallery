const Router = require('express').Router();
const Users = require('../knex/models/Users');
const Passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

Passport.serializeUser((user, done) => {
  console.log('03 - serializeUser', user)
  done(null, {
    username: user.username,
  })
})

Passport.deserializeUser((user, done) => {
  console.log('01 - deserializing User', user)
  Users
    .where({ username: user.username })
    .fetch()
    .then(user => {
      user = user.toJSON();
      done(null, user)
    })
    .catch(err => {
      console.log('err', err)
    })
})

// CONFIGURATION TO VERIFY CALLBACK FOR LOCAL AUTHENTICATION
Passport.use(new LocalStrategy((username, password, done) => {
  console.log('02 - local is being called')
  Users
    .where({ username })
    .fetch()
    .then(user => {
      console.log('user in local strategy', user)
      if (user === null) {
        return done(null, false, { message: 'Bad Username/Password' })
      } else {
        user = user.toJSON();
        bcrypt.compare(password, user.password)
          .then(result => {
            if (result) { return done(null, user) }
            else {
              return done(null, false, { message: 'Invalid Username/Password' })
            }
          })
      }
    })
    .catch(err => {
      done(null, false)
    })
}))

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
const SALT_ROUND = 12

//RENDERS THE USER REGISTRATION FORM
Router.get('/register', (req, res) => {
  res.render('./auth/register');
});

//POSTS THE USER REGISTRATION DATA TO DB AND REDIRECTS TO GALLERY
Router.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  bcrypt.hash(password, SALT_ROUND)
    .then(salt => {
      return bcrypt.hash(password, salt)
    })
    .then(hash => {
      return Users
        .forge({ email, username, password: hash })
        .save()
    })
    .then(user => {
      user = user.toJSON() //.toJSON turns data into JSON object
      console.log('user: ', user);
      // res.json(user) //What exactly does this do??
      // res.sendStatus(200) //What
      res.redirect('/auth/login')
    })
    .catch(err => {
      console.log(err, 'err')
      res.redirect('/register')
    })
});


//RENDERS THE LOGIN REGISTRATION FORM
Router.get('/login', (req, res) => {
  res.render('./auth/login');
});

Router.post('/login', Passport.authenticate('local', { failureRedirect: '/auth/login' }), (req, res) => {
  res.redirect('/gallery');
})


Router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

Router.get('/secret', isAuthenticated, (req, res) => {
  res.send('YOU HAVE FOUND DA SEKRET')
})

function isAuthenticated(req, res, next) {
  if ( req.isAuthenticated() ) { 
    next(); 
  } else { 
    res.redirect('/');
  }
};

// function isAuthenticated(req, res, done) {
//   if (req.isAuthenticated()) {
//     done()
//   } else {
//     res.redirect('/')
//   }
// }

module.exports = Router