var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose')

// Import function exported by newly installed node modules.
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

var postRouter = require('./routes/post');
var optionRouter = require('./routes/option');
var categoryRouter = require('./routes/category')
var usersRouter = require('./routes/users');

mongoose.connect('mongodb+srv://root:koala@cluster0-sehch.gcp.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

var app = express();
// to override the post method in the html form and having put method
var methodOverride = require('method-override');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout',
  layoutDir: path.join(__dirname, 'views/layout'),
  extname: '.hbs',
  handlebars: allowInsecurePrototypeAccess(handlebars)}));
app.set('view engine', '.hbs');

HandlebarsIntl.registerWith(handlebars);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(methodOverride('_method'))

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/', postRouter);
app.use('/', categoryRouter);
app.use('/', optionRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
