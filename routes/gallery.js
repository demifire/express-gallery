//~~~~~~~~~~~~~~ GALLERY ROUTE ~~~~~~~~~~~~~~//
const express = require('express');
const Router = express.Router();

const Gallery = require('../knex/models/Gallery.js');


//RENDER ALL ITEMS IN DATABASE
Router.get('/', (req, res) => {
  Gallery
    .fetchAll()
    .then(myGallery => {
      let galleryItem = myGallery.serialize()
      res.render('home.hbs', { galleryItem });
    })
    .catch(err => {
      res.json(err);
    })
})

//RENDER DETAILS OF ITEM
Router.get('/gallery/:id', (req, res) => {
  const { id } = req.params
  console.log('gallery req.params: ', req.params);

  Gallery
    .where({ id })
    .fetch()
    .then(painting => {
      // console.log(painting);
      let galleryItem = painting.serialize();
      res.render('details', { galleryItem });
    })
    .catch(err => {
      console.log('error', err)
    })
})

//ADD NEW ITEM
Router.get('/gallery/new', (req, res) => {
  res.render('new_item');
})

// POSTS NEW CREATED ITEM
Router.post('/gallery', (req, res) => {
  const { id } = req.params;
  const payload = {
    title: req.body.title,
    image_url: req.body.image_url,
    description: req.body.description
  }
  Gallery
    .forge(payload)
    .save()
    .then(() => {
      res.redirect('/')
    })
    .catch(err => {
      res.json(err)
    })
})


//DELETE ENTRIES
Router.delete('/gallery/:id', (req, res) => {
  const { id } = req.params;

  Gallery
    .where(id)
    .destroy()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      res.json(err);
    })
})




module.exports = Router;


//CHAZ CODE

// // get all photos by user_id
// app.get('/api/users/:user_id/photos', (req, res) => {
//   const { user_id } = req.params;
//   Photos
//     .where({ user_id })
//     .fetchAll()
//     .then(photos => {
//       res.json(photos.serialize())
//     })
//     .catch(err => {
//       res.json(err);
//     })
// })

// // create task by user id
// app.post('/api/users/:user_id/photos/new', (req, res) => {
//   const { user_id } = req.params;
//   const payload = {
//     name: req.body.name
//   }
//   Photos
//     .forge(payload)
//     .save()
//     .then(result => {
//       res.json(result)
//     })
//     .catch(err => {
//       console.log('error', err)
//       res.json(err);
//     })
// })

// // update task by task id
// app.put('/api/photos/:task_id/edit', (req, res) => {
//   const { task_id } = req.params;

//   const payload = {
//     name: req.body.name,
//     is_complete: req.body.is_complete
//   }

//   Photos
//     .where({ task_id })
//     .fetch()
//     .then(task => {
//       return task.save(payload)
//     })
//     .then(result => {
//       console.log('result', result)
//       res.json(result);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// })

// // delete task by task id
// app.delete('/api/photos/:photo_id/delete', (req, res) => {
//   const { task_id } = req.params;

//   Photos
//     .where({ task_id })
//     .destroy()
//     .then(result => {
//       res.json(result);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// })



