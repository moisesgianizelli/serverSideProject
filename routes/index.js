var express = require('express');
var router = express.Router();

const bookings = require('../models/guest');
const getTotalBookings = async () => {
  const totalBookings = await bookings.countDocuments();
  return totalBookings;
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'MUSIC WORKSHOP' });
});

router.get('/bookings/create', function (req, res, next) {
  res.render('newguest', { title: 'Booking' });
});

router.get('/bookings/manage', (req, res, next) => {
  res.render('manage', { title: 'Manage your booking' });
});

router.get('/bookings/delete', (req, res, next) => {
  res.render('deleteConfirmation', { title: 'Deletion' });
});

router.get('/bookings/update', (req, res, next) => {
  res.render('updateForm', { title: 'Updating' });
});
// check the const upthere
router.get('/bookings/report', async (req, res, next) => {
  try {
    const totalBookings = await getTotalBookings();
    res.render('report', { title: 'Report', totalBookings });
  } catch (err) {
    next(err);
  }
});

router.get('/bookings/guestList', (req, res, next) => {
  bookings
    .find({})
    .then((bookingsfound) => {
      res.render('guestList', {
        bookinglist: bookingsfound,
        title: 'List of guests',
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
