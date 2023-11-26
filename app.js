var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var musicRouter = require('./routes/musicRouter');

var app = express();
var favicon = require('serve-favicon');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const url = 'mongodb://localhost:27017/bookingshop';
const connect = mongoose.connect(url);
authMiddleware = require('./routes/authMiddleware');

connect.then(
  (db) => {
    console.log('Connected correctly to server');
  },
  (err) => {
    console.log(err);
  },
);
app.use('/', indexRouter);
app.use('/bookings', musicRouter);
app.use('/bookings/create', musicRouter);

app.get('/about', (req, res) => {
  res.render('about', { title: 'About the Music Workshop' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help page' });
});

app.get('/thanks', (req, res) => {
  res.render('thanks', { title: 'Thank you' });
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
