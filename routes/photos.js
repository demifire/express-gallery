const express = require('express');
const router = express.Router();

const Photos = require('../db/photos');
const photos = new Photos();

router.route('/')
  .get((req, res) => {
    // Inserted an athenable here to make sure that data from db loads first
    photos.loadDatabase()
      .then( loadingCompleted => {
        res.render('index', { 
          photos : {
            list : true,
            showFunction : photos.showAll().sort(function(a, b) {
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
      photos : {
        new : true
      }
    });
  })

  router.route('/sup')
  .get((req, res) => {
    res.render('index', {
      photos : {
        list : true,
        showFunction : photos.showAll() 
      }
    });
  })

  .post((req, res) => {
    if (photos.createProduct(req.body)) {
      return res.redirect('/photos');
    } else {
      return res.redirect('/photos/new');
    }
  });

router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;
    photos.refreshID(id)
      .then( loadingCompleted => {
        if (photos.checkIfPhotoExists(id)) {
          let data = loadingCompleted.rows[0];
    
          res.render('index', {
            photos : {
              photos : true,
              needToEdit : true,
              id : data.id,
              name : data.name,
              price : data.price,
              inventory : data.inventory
            }
          })
          return loadingCompleted;
        } else {
          res.redirect(`/photos`);
          return loadingCompleted;
        }
      })
      .catch( err => {
        console.log(err);
      })
  })

  .put((req, res) => {
    let id = req.params.id;
      if (photos.editPhoto(id, req.body)) {
        photos.loadDatabase()
          .then( loadingCompleted => {
            return res.redirect(`/photos/${id}`);
            // return loadingCompleted;
      })
      .catch( err => {
        console.log(err);
      })
    } else {
      res.render('index', { 
        photos : {
            list : true,
            showFunction : photos.showAll(),
            itemDeleted : true
        }
      })
    }
    }
  )

  .delete((req, res) => {
    let id = req.params.id;

    if (photos.removePhotos(id)) {
    return res.redirect('/photos');
    }
    else return res.render('index', { 
      photos : {
          list : true,
          showFunction : photos.showAll(),
          itemDeleted : true
      }
    })
  });

router.route('/:id/editDelete')
  .get((req, res) => {
    let id = req.params.id;
    let targetItem = photos.checkIfPhotoExists(id);

    if (targetItem) { 
      let data = photos.getPhoto(id);

      return res.render('index', {
        photos : {
          photo: true,
          edit : true,
          id : data.id,
          name : data.name,
          price : data.price,
          inventory : data.inventory
        }
      });
    
    } else {

      return res.redirect(`/photos/${id}`);
    }
  });


module.exports = router;