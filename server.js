const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const PORT = process.env.EXPRESS_CONTAINER_PORT;
const flash = require('connect-flash');


const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const passport = require('passport');

const Gallery = require('./routes/gallery.js');
const AuthRoutes = require('./routes/authRoutes.js');

//RUN MIDDLEWARE
app.use(express.static('public'));
app.use(bp.urlencoded({ extended: true }));

app.use(session({
  store: new RedisStore({ url: 'redis://redis-session-store:6379', logErrors: true }),
  secret: 'zyzzbrah',
  resave: false,
  saveUninitialized: true
}))

app.use(methodOverride('_method'));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.set('view engine', '.hbs');


//ROUTER
app.use('/', Gallery);
app.use('/', AuthRoutes);


// tells the app to listen upon the called server
app.listen(PORT, () => {
  console.log(`Started app on port: ${process.env.EXPRESS_CONTAINER_PORT}`);
});





