var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'MUSIC WORKSHOP' });
});

router.get('/pizzas/create', function (req, res, next) {
  res.render('newpizza', { title: 'Booking' });
});

module.exports = router;
