//~~~~~~~~~~~~~~ GALLERY ROUTE ~~~~~~~~~~~~~~//
const express = require('express');
const Router = express.Router();

const Gallery = require('../knex/models/Gallery.js');

//RENDER ALL PAINTINGS
Router.get('/gallery', (req, res) => {

  Gallery
    .fetchAll()
    .then(myGallery => {
      let galleryItem = myGallery.serialize()
      res.render('./gallery/gallery.hbs', { galleryItem });
    })
    .catch(err => {
      res.json(err);
    })
})

//RENDER DETAILS OF PAINTINGS
Router.get('/gallery/:gallery_id', (req, res) => {
  const { gallery_id } = req.params
  console.log('gallery req.params: ', req.params);

  Gallery
    .where({ gallery_id })
    .fetch()
    .then(painting => {
      console.log(painting);
      let paintingDetail = painting.serialize();
      res.render('./gallery/details.hbs', { paintingDetail });
    })
    .catch(err => {
      console.log('error', err)
    })
})

//ADD NEW PAINTINGS
Router.post('./gallery/new', (req, res) => {
  const payload = {
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  }
  Gallery
    .forge(payload)
    .save()
    .then(result => {
      res.redirect('/gallery')
    })
    .catch(err => {
      res.json(err)
    })
})


//DELETE ENTRIES
Router.delete('/gallery/:gallery_id', (req, res) => {
  const { gallery_id } = req.params
  console.log('gallery id: ', gallery_id);

  Gallery
    .where({ gallery_id })
    .destroy()
    .then(result => {
      res.redirect('/gallery');
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



