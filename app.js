const createError = require('http-errors');
const  express = require('express');
const  cookieParser = require('cookie-parser');
const  logger = require('morgan');
const  fs = require('fs');
const  path = require('path');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/config');
require('./config/passport')(passport);
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
  {
    resave: true,
    saveUninitialized: true,
    secret: 'secret'
  }));
app.use(passport.initialize());
app.use(passport.session());
const  routes = require('./routes/index')(passport);

app.use('/', routes);


app.locals.appName = config.name;

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
