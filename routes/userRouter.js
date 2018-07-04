var express = require('express');
var UserRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Users = require('../models/user');
var authenticate = require('../authenticate');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

UserRouter.route('/')
.get((req,res,next) => {
    if(req.query.user_id != null){
        Users.find({'user_id' : req.query.user})
        .then((users) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(users);
        }, (err) => next(err))
        .catch((err) => next(err));
    }else {
        Users.find({})
        .then((users) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(users);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
})
.post((req,res,next) =>{
    Users.create(req.body)
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = UserRouter ;
