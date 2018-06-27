var express = require('express');
var RestaurantRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Restaurants = require('../models/restaurant');
var Photos = require('../models/photo');
var authenticate = require('../authenticate');
//var cors = require('../routes/cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

RestaurantRouter.route('/')
//.options(cors.corsWithOptions ,(req,res) => {res.sendStatus(200)})
.get((req,res,next) => {
    if(req.query.business_id != null){
        Restaurants.aggregate([
            {
                $lookup: {
                    from: "photos", //add from it 
                    localField: "business_id",
                    foreignField: "business_id",
                    as: "photos"
                }
            },
            {
                $lookup: {
                    from: "menus", //add from it 
                    localField: "business_id",
                    foreignField: "business_id",
                    as: "menu"
                }
            },
            {
                $lookup: {
                    from: "reviews", //add from it 
                    localField: "business_id",
                    foreignField: "business_id",
                    as: "reviews"
                }
            }

        ])
        .then((restaurant) => {
            var filtered =restaurant.filter(rest => rest.business_id == req.query.business_id);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(filtered);
        }, (err) => next(err))
        .catch((err) => next(err));
    }else if (req.query.name != null){
        Restaurants.aggregate([
            {
                $lookup: {
                    from: "photos", //add from it 
                    localField: "business_id",
                    foreignField: "business_id",
                    as: "photos"
                }
            }
        ])
        .then((restaurant) => {
            var filtered =restaurant.filter(rest => rest.name == req.query.name);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(filtered);
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
            },            {
                $lookup: {
                    from: "photos", //add from it 
                    localField: "business_id",
                    foreignField: "business_id",
                    as: "photos"
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
        Restaurants.aggregate([
            {
                $lookup: {
                    from: "photos", //add from it 
                    localField: "business_id",
                    foreignField: "business_id",
                    as: "photos"
                }
            }
        ])
        .then((restaurant) => {
            var filtered =restaurant.filter(rest => rest.stars == req.query.stars);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(filtered);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else if(req.query.categories != null){
       Restaurants.aggregate([
           { $match : {'categories' : {$in :[req.query.categories,"$categories"]}}},
           {
            $lookup: {
                from: "photos", //add from it 
                localField: "business_id",
                foreignField: "business_id",
                as: "photos"
            }
        }
        ])
        .then((restaurant) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(restaurant);
        }, (err) => next(err))
        .catch((err) => next(err));
    }else if (req.query.is_open != null) {
        Restaurants.aggregate([
            {
                $lookup: {
                    from: "photos", //add from it 
                    localField: "business_id",
                    foreignField: "business_id",
                    as: "photos"
                }
            }
        ])
        .then((restaurant) => {
            var filtered =restaurant.filter(rest => rest.is_open == req.query.is_open);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(filtered);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else{
        Restaurants.aggregate([
            {
                $lookup: {
                    from: "photos", //add from it 
                    localField: "business_id",
                    foreignField: "business_id",
                    as: "photos"
                }
            }
        ])
        .then((restaurants) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({restaurants});
        }, (err) => next(err))
    }
}) 

.post(authenticate.verifyUser , authenticate.verifyAdmin , (req,res,next) =>{
     Restaurants.create(req.body)
     .then((restaurant) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(restaurant);
     }, (err) => next(err))
      .catch((err) => next(err))
})

.put(authenticate.verifyUser , authenticate.verifyAdmin , (req,res,next) =>{
    Restaurants.findOneAndUpdate({"business_id" : req.query.business_id} , req.body ,{new : true})
    .then((restaurant) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurant);
    }, (err) => next(err))
     .catch((err) => next(err))
})

.delete(authenticate.verifyUser , authenticate.verifyAdmin , (req,res,next) =>{
    Restaurants.deleteOne({"business_id" : req.query.business_id})
    .then((restaurant) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json('Restaurant removed correctly');
    },(err) => next(err))
    .catch((err) => next(err))
})

module.exports = RestaurantRouter ;
