const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('express-handlebars');

const PORT = process.env.EXPRESS_CONTAINER_PORT;
const Photos = require('./knex/models/Photos');
const photosBF = require('./bookshelfFunctions/photos.js')

const app = express();



app.engine('.hbs', hbs({
  defaultLayout : 'main',
  extname : '.hbs'}));

app.set('view engine', '.hbs');

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  Photos
        .fetchAll()
        .then(results => {
          console.log(results.serialize(), 'hello???')
          obj = results.toJSON();
          res.render('home', {obj});
        })
        .catch(err => {
          console.log(err, 'err');
        })
});

// Render Gallery Item Edit Form by ID
app.get('/gallery/:id/edit', (req, res) => {
  const { id } = req.params;
  
  Content
      .where({ id })
      .fetchAll()
      .then(results => {
          // console.log('edit results', results);
          let editObj = results.toJSON();
          res.render('edit', { editObj });
      })
      .catch(err => {
          res.json(err);
      });
});

// Edit Gallery Item by ID
// app.put('/gallery/:id', (req, res) => {
//   const { id } = req.params;
//   console.log('PUT ID', id);
  
//   const payload = {
//       title: req.body.title,
//       link: req.body.link,
//       image_url: req.body.image_url,
//       description: req.body.description
//   }

//   Content
//       .where({ id })
//       .fetch()
//       .then(results => {
//           return results.save(payload)
//       })
//       .then(results => {
//           // res.redirect('/');
//           console.log('REDIRECT TO THIS ID', id);
//           res.redirect(`/gallery/${(id)}`)
//       })
//       .catch(err => {
//           res.json(err);
//       });
// });

app.get('/gallery', (req, res) => {
  Photos
        .fetchAll()
        .then(results => {
          console.log(results.serialize(), 'hello???')
          obj = results.toJSON();
          res.render('psuedoGallery', {obj});
        })
        .catch(err => {
          console.log(err, 'err');
        })
});

app.get('/gallery/new', (req, res) => {

  res.render('addPhoto')
  });

  // Display Gallery item by ID
  app.get('/gallery/:gallery_id', (req, res) => {
    const {gallery_id} = req.params;
    Photos
        .where({gallery_id} )
        .fetchAll()
        .then(results => {
            let obj = results.toJSON()[0];
            console.log(obj, 'what is this?')
            res.render('photo', { obj });
        })
        .catch(err => {
            res.json(err);
        });
});



// Create new gallery item
app.post('/gallery', (req, res) => {
  console.log(req.body, 'this is the req body!!');
  const payload = {
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
  }
  Photos
      .forge(payload)
      .save()
      .then(result => {
          res.redirect('/');
      })
      .catch(err => {
          console.log(err,'this is not going through')
          res.json(err);
      });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})