const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const pizzas = require('../models/pizza');

const pizzaRouter = express.Router();

pizzaRouter.route('/')
.get((req,res,next) => {
})
.post((req, res, next) => {
})
.put((req, res, next) => {
})
.delete((req, res, next) => {
});


pizzaRouter.route('/create')
.get((req,res,next) => {
    res.render('newpizza.ejs', { title: 'Pizza shop' });   
})

.post((req, res, next) => {
    pizzas.create(req.body)
    .then((pizzacreated) => {
        pizzas.find()
         .then((pizzasfound) => {
                res.render('currentorder',{'pizzalist' : pizzasfound, title:'All Pizzas'} );
        }, (err) => next(err))
    .catch((err) => next(err));
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /pizzas/create');
})

.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Delete operation not  supported on /pizzas/creste');
    
});


module.exports = pizzaRouter;