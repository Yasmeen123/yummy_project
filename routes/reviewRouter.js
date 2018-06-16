var express = require('express');
var reviewRouter = express.Router();
var bodyParser = require('body-parser');
var url = require('url');
var mongoose = require('mongoose');
var Reviews = require('../models/review');
var authenticate = require('../authenticate');
//var cors = require('../routes/cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

reviewRouter.route('/')
.options(/*cors.corsWithOptions ,*/(req,res) => {res.sendStatus(200)})
.get(/*cors.cors ,*/ (req,res,next) => {
    if(req.query.business_id != null){
        Reviews.find({ business_id : req.query.business_id})
        .then((review) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(review);
        }, (err) => next(err))
        .catch((err) => next(err));
    }else{
        Reviews.find({})
        .then((reviews) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(reviews);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
})

.post(/*cors.corsWithOptions ,*/  authenticate.verifyUser , (req,res,next) =>{
    Reviews.create(req.body)
    .then((review) => {
        console.log('Review Created ', review);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(review);
    }, (err) => next(err))
    .catch((err) => next(err));
})



module.exports = reviewRouter ;
