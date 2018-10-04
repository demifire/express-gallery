//~~~~~~~~~~~~~~ GALLERY ROUTE ~~~~~~~~~~~~~~//
const express = require('express');
const Router = express.Router();

const Gallery = require('../knex/models/Gallery.js');

const isAuthenticated = require('../middleware/authenticated.js');


//RENDER GALLERY AND ALL ITEMS FOR HOMEPAGE

Router.route('/')
  .get(isAuthenticated, (req, res) => {
    return Gallery
    .fetchAll()
    .then(myGallery => {
      let galleryItem = myGallery.serialize()
      // console.log('homeGallery: ', galleryItem);
      res.render('gallery.hbs', { galleryItem });
    })
    .catch(err => {
      res.json(err);
    })
  });

//RENDER DETAILS OF ITEM
Router.route('/:id')
  .get(isAuthenticated, (req, res) => {
  const { id } = req.params
  console.log('gallery req.params: ', req.params);

  Gallery
    .where({ id })
    .fetch()
    .then(painting => {
      // console.log(painting);
      let galleryItem = painting.serialize();
      res.render('details', { galleryItem });
      // console.log('galleryryItem: ', galleryItem)
    })
    .catch(err => {
      console.log('error', err)
    })
})

//RENDER NEW ITEM FORM
Router.get('/new', (req, res) => {
  res.render('new_item');
})

// POSTS NEW CREATED ITEM
Router.post('/', (req, res) => {
  const { id } = req.params;
  const newPhoto = {
    title: req.body.title,
    image_url: req.body.image_url,
    description: req.body.description
  }
  Gallery
    .forge(newPhoto)
    .save()
    .then(() => {
      res.redirect(`/`)
    })
    .catch(err => {
      console.log('error', err)
      res.json(err)
    })
})


//DELETE ENTRIES
Router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Gallery
    .where({ id })
    .destroy()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      res.json(err);
    })
})


//RENDER EDIT FORUM
Router.get('/:id/edit', (req, res) => {
  const { id } = req.params;

  Gallery
    .where({ id })
    .fetch()
    .then(result => {
      let editObj = result.toJSON();
      res.render('edit', { editObj });
    })
    .catch(err => {
      res.json(err);
    })
})


//EDIT ENTRIES
Router.put('/:id', (req, res) => {
  const { id } = req.params;
  const newPhoto = {
    title: req.body.title,
    image_url: req.body.image_url,
    description: req.body.description
  }

  Gallery
    .where({ id })
    .fetch()
    .then(update => {
      return update.save(newPhoto)
    })
    .then(result => {
      res.redirect(`/${(id)}`)
    })
    .catch(err => {
      res.json(err)
    })
})



module.exports = Router;






