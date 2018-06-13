var express = require('express');
var UserRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Users = require('../models/user');
var authenticate = require('../authenticate');
var cors = require('../routes/cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

UserRouter.route('/')
.options(cors.corsWithOptions ,(req,res) => {res.sendStatus(200)})
.get(cors.cors , (req,res,next) => {
    Users.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions , (req,res,next) =>{
    Users.create(req.body)
    .then((user) => {
        console.log('user Created ', user);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})

UserRouter.route('/:user_id')
.options(cors.corsWithOptions ,(req,res) => {res.sendStatus(200)})
.get(cors.cors , (req,res,next) => {
    Users.find({'user_id' : req.params.user_id})
    .then((user) => {
     res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(cors.corsWithOptions ,  authenticate.verifyUser , (req,res,next) =>{
    Users.create(req.body)
    .then((user) => {
        console.log('user Created ', user);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = UserRouter ;
