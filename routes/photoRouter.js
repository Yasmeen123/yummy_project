var express = require('express');
var PhotoRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Photos = require('../models/photo');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

PhotoRouter.route('/')
.get((req,res,next) => {
    if(req.query.business_id != null){
        Photos.find({'business_id' : req.query.business_id})
        .then((restaurant) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(restaurant);
        }, (err) => next(err))
        .catch((err) => next(err));
    }else {
        Photos.find({})
        .then((restaurant) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(restaurant);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
})
.post((req,res,next) =>{
    Photos.create(req.body)
    .then((restaurant) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurant);
    }, (err) => next(err))
     .catch((err) => next(err))
});

module.exports = PhotoRouter ;
