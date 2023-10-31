const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookings = require('../models/guest');

const musicRouter = express.Router();

musicRouter
  .route('/')
  .get((req, res, next) => {})
  .post((req, res, next) => {})
  .put((req, res, next) => {})
  .delete((req, res, next) => {});

musicRouter
  .route('/create')
  .get((req, res, next) => {
    res.render('newbooking.ejs', { title: 'Event' });
  })

  .post((req, res, next) => {
    bookings
      .create(req.body)
      .then(
        (bookingcreated) => {
          bookings
            .find()
            .then(
              (bookingsfound) => {
                res.render('guestList', {
                  bookinglist: bookingsfound,
                  title: 'List of guests',
                });
              },
              (err) => next(err),
            )
            .catch((err) => next(err));
        },
        (err) => next(err),
      )
      .catch((err) => next(err));
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /bookings/create');
  })

  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Delete operation not  supported on /bookings/creste');
  });

module.exports = musicRouter;
