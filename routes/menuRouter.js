var express = require('express');
var MenuRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Menus = require('../models/menu');
var authenticate = require('../authenticate');
var cors = require('../routes/cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

MenuRouter.route('/')
.options(cors.corsWithOptions ,(req,res) => {res.sendStatus(200)})
.get(cors.cors , (req,res,next) => {
    if(req.query.business_id != null){
        Menus.find({'business_id' : req.query.business_id})
        .then((menu) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(menu);
        }, (err) => next(err))
        .catch((err) => next(err));
    }else {
        Menus.find({})
        .then((menus) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(menus);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
})
.post(cors.corsWithOptions ,  authenticate.verifyUser , (req,res,next) =>{
    Menus.create(req.body)
    .then((menu) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(menu);
    }, (err) => next(err))
     .catch((err) => next(err))
});

module.exports = MenuRouter ;
