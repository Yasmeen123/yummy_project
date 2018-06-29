var express = require('express');
var FavouriteRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Favourites = require('../models/favourite');
var Restaurants = require('../models/restaurant');
var authenticate = require('../authenticate');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

FavouriteRouter.route('/')
.get((req,res,next) => {
    if(req.query.user_id != null){
        Favourites.aggregate([
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
        .then((restaurant) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(restaurant);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
})

.post(authenticate.verifyUser , (req,res,next) => {
    Favourites.create(req.body)
    .then((restaurant) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurant);
    }, (err) => next(err))
     .catch((err) => next(err))
})

.delete(authenticate.verifyUser, (req,res,next) =>{
    Favourites.deleteOne({"business_id" : req.query.business_id})
    .then((restaurant) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json('This Restaurant removed correctly');
    },(err) => next(err))
    .catch((err) => next(err))
})

module.exports = FavouriteRouter ;