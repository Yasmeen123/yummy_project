var express = require('express');
var MenuRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Menus = require('../models/menu');
var Restaurants = require('../models/restaurant');
var authenticate = require('../authenticate');
var cors = require('../routes/cors');

var _ = require('underscore');

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
    }else if (req.query.rating != null){
            Menus.aggregate([
                {
                    $lookup: {
                        from: "restaurants", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "restaurant"
                    }
                },
                {
                    $lookup: {
                        from: "photos", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "photos"
                    }
                }
            ])
        .then((menus) => {
            var filtered =menus.filter(menu => menu.rating = req.query.rating);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(filtered);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else if (req.query.price != null){
        if (req.query.price  == 1){
            Menus.aggregate([
                {
                    $lookup: {
                        from: "restaurants", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "restaurant"
                    }
                },
                {
                    $lookup: {
                        from: "photos", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "photos"
                    }
                }
            ])
        .then((menus) => {
            var filtered =menus.filter(menu => menu.price < 7);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(filtered);
        }, (err) => next(err))
        .catch((err) => next(err));
        }else if (req.query.price  == 2){
            Menus.aggregate([
                {
                    $lookup: {
                        from: "restaurants", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "restaurant"
                    }
                },
                {
                    $lookup: {
                        from: "photos", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "photos"
                    }
                }
            ])
        .then((menus) => {
            var filtered =menus.filter(menu => menu.price > 7 && menu.price < 14 );
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(filtered);
        }, (err) => next(err))
        .catch((err) => next(err));
        }
        else if (req.query.price  == 3){
            Menus.aggregate([
                {
                    $lookup: {
                        from: "restaurants", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "restaurant"
                    }
                },
                {
                    $lookup: {
                        from: "photos", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "photos"
                    }
                }
            ])
        .then((menus) => {
            var filtered =menus.filter(menu => menu.price > 14 && menu.price < 21 );
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(filtered);
        }, (err) => next(err))
        .catch((err) => next(err));
            }
    }
    else if (req.query.price && req.query.rating != null){
        if (req.query.price  == 1){
            Menus.aggregate([
                {
                    $lookup: {
                        from: "restaurants", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "restaurant"
                    }
                },
                {
                    $lookup: {
                        from: "photos", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "photos"
                    }
                }
            ])
        .then((menus) => {
            var filtered = menus.filter(menu => {return menu.price < 7}).filter(menu => {return menu.rating == req.query.rating});
            res.setHeader('Content-Type', 'application/json');
            res.json(filtered);
        }, (err) => next(err))
        .catch((err) => next(err));
        }else if (req.query.price  == 2){
            Menus.aggregate([
                {
                    $lookup: {
                        from: "restaurants", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "restaurant"
                    }
                },
                {
                    $lookup: {
                        from: "photos", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "photos"
                    }
                }
            ])
        .then((menus) => {
            var filtered =menus.filter(menu => menu.price > 7 && menu.price < 14 );
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(filtered);
        }, (err) => next(err))
        .catch((err) => next(err));
        }
        else if (req.query.price  == 3){
            Menus.aggregate([
                {
                    $lookup: {
                        from: "restaurants", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "restaurant"
                    }
                },
                {
                    $lookup: {
                        from: "photos", //add from it 
                        localField: "business_id",
                        foreignField: "business_id",
                        as: "photos"
                    }
                }
            ])
        .then((menus) => {
            var filtered =menus.filter(menu => menu.price > 7 && menu.price < 14 );
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(filtered);
        }, (err) => next(err))
        .catch((err) => next(err));
        }
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
