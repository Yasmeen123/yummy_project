var express = require('express');
var RestaurantRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Restaurants = require('../models/restaurant');
var Photos = require('../models/photo');
var authenticate = require('../authenticate');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

RestaurantRouter.route('/')
.get((req,res,next) => {
    if(req.query.business_id != null){
        Restaurants.find({'business_id' : req.query.business_id})
        .then((restaurant) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(restaurant);
        }, (err) => next(err))
        .catch((err) => next(err));
    }else if (req.query.name != null){
        Restaurants.find({'name' : req.query.name})
          .then((restaurant) => {
             res.statusCode = 200;
             res.setHeader('Content-Type', 'application/json');
             res.json(restaurant);
             }, (err) => next(err))
        .catch((err) => next(err));
    }else if (req.query.latitude && req.query.longitude != null) {
        var lat = req.query.latitude ;
        var long = req.query.longitude ;
       Restaurants.aggregate([
            {
                $geoNear : {
                    near : {type : "Point" , coordinates : [parseFloat(long) , parseFloat(lat)]},
                    distanceField : "dist.calculated",
                    minDistance : 0.05 ,
                    spherical : true,
                    limit : 6,
                }
            }
        ])
       .then((restaurants) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurants);
        }, (err) => next(err))
        .catch((err) => next(err));
    }else if (req.query.stars != null){
        Restaurants.find({'stars' : req.query.stars})
        .then((populars) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(populars);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else if(req.query.categories != null){
       Restaurants.aggregate(
           [{ $match : {'categories' : {$in :[req.query.categories,"$categories"]}}}]
       )
        .then((restaurant) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(restaurant);
        }, (err) => next(err))
        .catch((err) => next(err));
    }else if (req.query.is_open != null) {
        Restaurants.find({is_open : req.query.is_open})
        .then((restaurants) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(restaurants);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else{
        Restaurants.aggregate([{
            $lookup: {
                from: "photos", //add from it 
                localField: "business_id",
                foreignField: "business_id",
                as: "photos"
            }
        }])
        .then((restaurants) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({restaurants});
        }, (err) => next(err))
    }
}) 

.post(authenticate.verifyUser , (req,res,next) =>{
     Restaurants.create(req.body)
     .then((restaurant) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(restaurant);
     }, (err) => next(err))
      .catch((err) => next(err))
})

module.exports = RestaurantRouter ;
