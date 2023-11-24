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
    res.render('guestList.ejs', { title: 'Event' });
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
                res.render('thanks', {
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
    res.end('Delete operation not supported on /bookings/create');
  });

musicRouter
  .route('/delete/:bookingId')
  .get((req, res, next) => {
    // This could render a confirmation page or perform any other necessary logic
    const bookingId = req.params.bookingId;

    // Fetch the booking by ID from the database and render a confirmation page
    bookings
      .findById(bookingId)
      .then(
        (booking) => {
          res.render('deleteConfirmation', {
            booking,
            title: 'Delete Confirmation',
          });
        },
        (err) => next(err),
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    const bookingId = req.params.bookingId;
    bookings
      .findByIdAndRemove(bookingId)
      .then(
        (response) => {
          console.log('Booking deleted:', response);
          res.redirect('/bookings/guestList'); // Redirect to the guestList page after deletion
        },
        (err) => next(err),
      )
      .catch((err) => next(err));
  });

musicRouter
  .route('/update/:bookingId')
  .get((req, res, next) => {
    const bookingId = req.params.bookingId;
    bookings
      .findById(bookingId)
      .then(
        (booking) => {
          res.render('updateForm', {
            booking,
            title: 'Update Details',
          });
        },
        (err) => next(err),
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    const bookingId = req.params.bookingId;
    bookings
      .findByIdAndUpdate(bookingId, req.body, { new: true })
      .then(
        (updatedBooking) => {
          console.log('Booking updated:', updatedBooking);
          res.redirect('/bookings/guestList');
        },
        (err) => next(err),
      )
      .catch((err) => next(err));
  });

musicRouter.get('/report', async (req, res, next) => {
  try {
    const totalBookings = await bookings.countDocuments();

    res.render('report', {
      title: 'Booking Report',
      totalBookings,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = musicRouter;
