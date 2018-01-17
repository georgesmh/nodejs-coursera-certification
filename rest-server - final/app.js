let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let index = require('./routes/index');
let users = require('./routes/users');
let dishRouter = require('./routes/dishRouter');
let promoRouter = require('./routes/promoRouter');
let leaderRouter = require('./routes/leaderRouter');
let favoriteRouter = require('./routes/favoriteRouter');
let config = require('./config');
const passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let authenticate = require('./authenticate');

let app = express();

// Secure Traffic only:
app.all('*', function (req, res, next) {
  if (req.secure) {
    return next();
  }
  res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.url);
})

// view engine setup:  jade, handlebars, mustache and eds
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// Connect to db:

//let url = 'mongodb://127.0.0.1:27017/conFusion';   // conFusion is the database

mongoose.connect(config.mongoUrl);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('We are connected to mongodb successfully!!');
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// add code for passport configuration

app.use(passport.initialize());



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);
app.use('/favorites', favoriteRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;