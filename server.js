const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const PORT = process.env.EXPRESS_CONTAINER_PORT;


const Gallery = require('./routes/gallery.js');
// const Users = require('./routes/users.js');

//ROUTER
app.use('/', Gallery);


//RUN MIDDLEWARE
app.use(express.static('public'));
app.use(bp.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');


// app.get('/', (req, res) => {
//   res.render('home')
// });



// tells the app to listen upon the called server
app.listen(PORT, () => {
  console.log(`Started app on port: ${process.env.EXPRESS_CONTAINER_PORT}`);
});





