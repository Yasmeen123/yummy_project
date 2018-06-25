var express = require('express');
var CommentRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comments = require('../models/comment');
var authenticate = require('../authenticate');
//var cors = require('../routes/cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

CommentRouter.route('/')
//.options(cors.corsWithOptions ,(req,res) => {res.sendStatus(200)})
.get(/*cors.cors , */(req,res,next) => {
    if (req.query.id != null){
        Comments.find({'id' : req.query.id})
        .then((comment) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(comment);
        }, (err) => next(err))
        .catch((err) => next(err));
    }else{
        Comments.find({})
        .then((comments) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(comments);
        }, (err) => next(err))
        .catch((err) => next(err));
    }  
    })

.post(/*cors.corsWithOptions ,*/authenticate.verifyUser , (req,res,next) => {
       Comments.create(req.body)
       .then((comment) => {
           res.statusCode = 200 ;
           res.setHeader('Content-type' , 'application/json');
           res.json(comment);
       }, (err) => next(err)) 
       .catch((err) => next(err))
});

module.exports = CommentRouter ;