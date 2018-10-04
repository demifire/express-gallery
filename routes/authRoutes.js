const router = require('express').Router();
const Users = require('../knex/models/Users');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  console.log('03 - serializeUser', user)
  done(null, {
    username: user.username,
  })
})

passport.deserializeUser((user, done) => {
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

passport.use(new LocalStrategy((username, password, done) => {
  console.log('02 - local is being called')
  Users
    .where({ username })
    .fetch()
    .then(user => {
      console.log('user in local strategy', user)
      user = user.toJSON();
      // if (user.password === password) {
      //   done(null, user )
      // } else {
      //   done(null, false)
      // }
      bcrypt.compare(password, user.password)
        .then(res => {
          if (res) {
            done(null, user)
          } else {
            done(null, false)
          }
        })
    })
    .catch(err => {
      done(null, false)
    })
}))


const SALT_ROUND = 12

router.get('/auth/register', (req, res) => {
  res.render('./auth/register');
});

//POSTS THE USER REGISTRATION DATA TO DB AND REDIRECTS TO GALLERY
router.post('/auth/register', (req, res) => {
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



router.get('/auth/login', (req, res) => {
  res.render('./auth/login');
});


router.post('/auth/login', passport.authenticate('local', { failureRedirect: '/auth/login' }), (req, res) => {
  // grab the user on record
  // compare req.body.password to password on record

  res.redirect('/');
})

// router.post('/auth/logout', (req, res) => {
//   req.logout()
//   res.redirect('/')
// })

// router.get('/auth/secret', isAuthenticated, (req, res) => {
//   res.send('YOU HAVE FOUND DA SEKRET')
// })

// function isAuthenticated(req, res, done) {
//   if (req.isAuthenticated()) {
//     done()
//   } else {
//     res.redirect('/')
//   }
// }

module.exports = router;



// const express = require('express');
// const Router = express.Router();

// const Users = require('../knex/models/Users.js')
// const Passport = require('passport');
// const LocalStrategy = require('passport-local');
// const bcrypt = require('bcrypt');


// Passport.serializeUser((user, done) => {
//   // console.log('03 - serializeUser', user)
//   done(null, {
//     username: user.username,
//   })
// })

// Passport.deserializeUser((user, done) => {
//   Users
//     .where({ id: user.id })
//     .fetch()
//     .then(user => {
//       user = user.toJSON();
//       done(null, user)
//     })
//     .catch(err => {
//       return done(err)
//     })
// })

// // CONFIGURATION TO VERIFY CALLBACK FOR LOCAL AUTHENTICATION
// Passport.use(new LocalStrategy((username, password, done) => {
//   console.log('02 - local is being called')
//   Users
//     .where({ username })
//     .fetch()
//     .then(user => {
//       console.log('user in local strategy', user)
//       user = user.toJSON();
//       // if (user.password === password) {
//       //   done(null, user )
//       // } else {
//       //   done(null, false)
//       // }
//       bcrypt.compare(password, user.password)
//         .then(res => {
//           if (res) {
//             done(null, user)
//           } else {
//             done(null, false)
//           }
//         })
//     })
//     .catch(err => {
//       done(null, false)
//     })
// }))

// // Passport.use(new LocalStrategy(function (username, password, done) {
// //   return new Users({ username: username })
// //     .fetch()
// //     .then(user => {
// //       if (user === null) {
// //         return done(null, false, { message: 'bad username or password' });
// //       } else {
// //         user = user.toJSON();
// //         bcrypt.compare(password, user.password)
// //           .then(samePassword => {
// //             if (samePassword) { return done(null, user); }
// //             else {
// //               return done(null, false, { message: 'bad username or password' });
// //             }
// //           })
// //       }
// //     })
// //     .catch(err => {
// //       return done(err);
// //     });
// // }));

// //USE BCRYPT TO SALT THE PASSWORDS SO THEY ARE NOT VISABLE
// const SALT_ROUND = 10

// //RENDERS THE USER REGISTRATION FORM
// Router.get('/auth/register', (req, res) => {
//   res.render('./auth/register');
// });

// //POSTS THE USER REGISTRATION DATA TO DB AND REDIRECTS TO GALLERY
// Router.post('/auth/register', (req, res) => {
//   const { email, username, password } = req.body;

//   bcrypt.hash(password, 10)
//     .then(salt => {
//       return bcrypt.hash(password, salt)
//     })
//     .then(hash => {
//       return Users
//         .forge({ email, username, password: hash })
//         .save()
//     })
//     .then(user => {
//       user = user.toJSON()
//       console.log('user: ', user);
//       // res.json(user) //What exactly does this do??
//       // res.sendStatus(200) //What
//       res.redirect('/')
//     })
// });

// Router.get('/auth/login', (req, res) => {
//   res.render('./auth/login');
// });

// Router.post('/auth/login', Passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/auth/login'
// }), (req, res) => {
//   console.log('**************************');
//   console.log('successfull login');
// })

// // Router.post('/auth/login', (req, res, next) => {
// //   console.log('login get', req.body)
// //   // req.body.username = req.body.username.toLowerCase();
// //   Passport.authenticate('local', (err, user, info) => {
// //     console.log('user: ', user)
// //     if (err) {
// //       req.flash('error', `wrong username or password`);
// //       return res.redirect('/auth/login')
// //     } else if (!user) {
// //       req.flash('error', `wrong username or password`);
// //       return res.redirect('/auth/login')
// //     } else if (req.body.username < 1 || req.body.password.length < 1) {
// //       req.flash('error', `wrong username or password`);
// //       return res.redirect('/auth/login')
// //     }
// //     req.login(user, (err) => {
// //       if (err) { return next(err); }
// //       return res.redirect('/');
// //       // return res.json({ success: true })
// //     });
// //   })(req, res, next);
// // });



// module.exports = Router;