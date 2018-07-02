var express = require('express');
var reviewRouter = express.Router();
var bodyParser = require('body-parser');
var url = require('url');
var mongoose = require('mongoose');
var Reviews = require('../models/review');
var authenticate = require('../authenticate');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

reviewRouter.route('/')
.get((req,res,next) => {
    if(req.query.review_id != null){
        Reviews.find({ 'review_id' : req.query.review_id})
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

.post(authenticate.verifyUser , (req,res,next) =>{
    Reviews.create(req.body)
    .then((review) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({Review : review , review_id : review._id});
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put(authenticate.verifyUser , (req,res,next) =>{
    Reviews.findOneAndUpdate({"_id" : req.query.review_id , "user_id" : req.query.user_id} , req.body ,{new : true})
    .then((review) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(review);
    }, (err) => next(err)) 
     .catch((err) => next(err)) 
})

.delete(authenticate.verifyUser, (req,res,next) =>{
    Reviews.findOneAndRemove({$and :[{"_id" : req.query.review_id} , {"user_id" : req.query.user_id }]})
    .then((restaurant) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurant);
    },(err) => next(err))
    .catch((err) => next(err))
})



module.exports = reviewRouter ;
