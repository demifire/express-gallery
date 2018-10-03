const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const PORT = process.env.EXPRESS_CONTAINER_PORT;

const session = require('express-session');
const RedisStore = require('connect-redis')(session);


const Gallery = require('./routes/gallery.js');
const AuthRoutes = require('./routes/authRoutes.js');

app.use(session({
  store: new RedisStore({ url: 'redis://redis-session-store:6379', logErrors: true }),
  secret: 'zyzzbrah',
  resave: false,
  saveUninitialized: true
}))



//RUN MIDDLEWARE
app.use(express.static('public'));
app.use(bp.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//ROUTER
app.use('/', Gallery);
app.use('/', AuthRoutes);

app.get('/', (req, res) => {
  console.log('req.session: ', req.session);
  res.render('home')
});


// tells the app to listen upon the called server
app.listen(PORT, () => {
  console.log(`Started app on port: ${process.env.EXPRESS_CONTAINER_PORT}`);
});





