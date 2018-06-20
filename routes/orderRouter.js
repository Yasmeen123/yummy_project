var express = require('express');
var OrderRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Orders = require('../models/order');
var authenticate = require('../authenticate');
//var cors = require('../routes/cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

OrderRouter.route('/')
//.options(cors.corsWithOptions ,(req,res) => {res.sendStatus(200)})
.get(/*cors.cors , */(req,res,next) => {
        Orders.find({})
        .then((orders) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(orders);
        }, (err) => next(err))
        .catch((err) => next(err));
    })

.post(/*cors.corsWithOptions ,*/authenticate.verifyUser , (req,res,next) => {
       Orders.create(req.body)
       .then((order) => {
           res.statusCode = 200 ;
           res.setHeader('Content-type' , 'application/json');
           res.json(order);
       }, (err) => next(err)) 
       .catch((err) => next(err))
});

module.exports = OrderRouter ;