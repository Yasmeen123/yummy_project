var express = require('express');
var recommendationRouter = express.Router();
var bodyParser = require('body-parser');
var url = require('url');
var mongoose = require('mongoose');
var Recommendations = require('../models/recommendation');
var authenticate = require('../authenticate');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

recommendationRouter.route('/')
.get((req,res,next) => {
    if(req.query.user_id != null){
        Recommendations.find({'user_id' : req.query.user_id})
        .then((recomm) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(recomm);
        }, (err) => next(err))
        .catch((err) => next(err));
    }else{
        Recommendations.find({})
        .then((recomms) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(recomms);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
})
.post((req,res,next) => {
        Recommendations.create(req.body)
        .then((recomm) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(recomm);
        }, (err) => next(err))
        .catch((err) => next(err));

})

module.exports = recommendationRouter ;
