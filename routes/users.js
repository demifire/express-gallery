const express = require('express');
const router = express.Router();

const Users = require('../db/users');
const users = new Users();

router.route('/')
  .get((req, res) => {
    // Inserted an athenable here to make sure that data from db loads first
    users.loadDatabase()
      .then( loadingCompleted => {
        res.render('index', { 
          users : {
            list : true,
            showFunction : users.showAll().sort(function(a, b) {
              return (a.id - b.id) || a.name.localeCompare(b.name);
            })
          } 
        });
        return loadingCompleted;
      })
      .catch( err => {
        console.log(err);
      })
  });

router.route('/new')
  .get((req, res) => {
    res.render('index', {
      users : {
        new : true
      }
    });
  })

  .post((req, res) => {
    if (users.createProduct(req.body)) {
      return res.redirect('/users');
    } else {
      return res.redirect('/users/new');
    }
  });

router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;
    users.refreshID(id)
      .then( loadingCompleted => {
        if (users.checkIfUserExists(id)) {
          let data = loadingCompleted.rows[0];
    
          res.render('index', {
            users : {
              user : true,
              needToEdit : true,
              id : data.id,
              name : data.name,
              price : data.price,
              inventory : data.inventory
            }
          })
          return loadingCompleted;
        } else {
          res.redirect(`/users`);
          return loadingCompleted;
        }
      })
      .catch( err => {
        console.log(err);
      })
  })

  .put((req, res) => {
    let id = req.params.id;
      if (users.editUser(id, req.body)) {
        users.loadDatabase()
          .then( loadingCompleted => {
            return res.redirect(`/users/${id}`);
            // return loadingCompleted;
      })
      .catch( err => {
        console.log(err);
      })
    } else {
      res.render('index', { 
        users : {
            list : true,
            showFunction : users.showAll(),
            itemDeleted : true
        }
      })
    }
    }
  )

  .delete((req, res) => {
    let id = req.params.id;

    if (users.removeUsers(id)) {
    return res.redirect('/users');
    }
    else return res.render('index', { 
      users : {
          list : true,
          showFunction : users.showAll(),
          itemDeleted : true
      }
    })
  });

router.route('/:id/editDelete')
  .get((req, res) => {
    let id = req.params.id;
    let targetItem = users.checkIfUserExists(id);

    if (targetItem) { 
      let data = users.getUser(id);

      return res.render('index', {
        users : {
          user: true,
          edit : true,
          id : data.id,
          name : data.name,
          price : data.price,
          inventory : data.inventory
        }
      });
    
    } else {

      return res.redirect(`/users/${id}`);
    }
  });


module.exports = router;