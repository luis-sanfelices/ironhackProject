const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, { reconnectTries: false }, (err) => {
  if (err) {
    console.log(err);
    process.exit(0);
  } else {
    console.log('connected');
  }
});

const index = require('./routes/index');
const users = require('./routes/users');
const signup = require('./routes/auth/signup');
const signin = require('./routes/auth/signin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('layout extractScripts', true); // see Documentation
app.set('layout extractStyles', true); // see Documentation
app.set('layout extractMetas', true); // see Documentation
app.set('layout', 'layouts/main'); // custom layout

app.use(expressLayouts);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/signup', signup);
// app.use('/signin', signin);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
