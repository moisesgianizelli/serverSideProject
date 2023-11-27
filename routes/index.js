var express = require('express');
var router = express.Router();

const bookings = require('../models/guest');
const getTotalBookings = async () => {
  const totalBookings = await bookings.countDocuments();
  return totalBookings;
};

const basicAuth = require('basic-auth');

const users = {
  admin: '1234',
};

const authMiddleware = () => {
  return (req, res, next) => {
    const user = basicAuth(req);
    if (!user || !users[user.name] || users[user.name] !== user.pass) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.status(401).send('Unauthorized Access!');
    }
    next();
  };
};

module.exports = authMiddleware;

const getMostCommonDate = async () => {
  const mostCommonDate = await bookings.aggregate([
    {
      $group: {
        _id: '$date',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  return mostCommonDate.length > 0 ? mostCommonDate[0]._id : 'N/A';
};

const getMostCommonDescription = async () => {
  const mostCommonDescription = await bookings.aggregate([
    {
      $group: {
        _id: '$description',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  return mostCommonDescription.length > 0
    ? mostCommonDescription[0]._id
    : 'N/A';
};

module.exports = {
  bookings,
  getTotalBookings,
  getMostCommonDate,
  getMostCommonDescription,
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'MUSIC WORKSHOP' });
});

router.get('/bookings/create', function (req, res, next) {
  res.render('newguest', { title: 'Booking' });
});

router.get('/bookings/delete', (req, res, next) => {
  res.render('deleteConfirmation', { title: 'Deletion' });
});

router.get('/bookings/update', (req, res, next) => {
  res.render('updateForm', { title: 'Updating' });
});

router.get('/bookings/report', authMiddleware(), async (req, res, next) => {
  try {
    const totalBookings = await getTotalBookings();
    const mostCommonDate = await getMostCommonDate();
    const mostCommonDescription = await getMostCommonDescription();

    res.render('report', {
      title: 'Report',
      totalBookings,
      mostCommonDate,
      mostCommonDescription,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/bookings/guestList', authMiddleware(), (req, res, next) => {
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
