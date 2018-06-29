var mongoose = require('mongoose');
var schema = mongoose.Schema ;

var favouriteSchema = new schema ({
      user_id : {
          type : String ,
          required : true 
      },
       business_id : {
          type : String ,
          required : true ,
       },
        name : {
           type : String ,
           required : true ,
           unique : true
        },
        neighborhood : {
           type : String ,
           required : false
        },
        address : {
            type : String ,
            required : false
        },
        city : {
           type : String ,
           required : true
        },
        state : {
            type : String ,
            required : true
        },
        postal_code : {
            type : String ,
            required : true
        },
        location : [Number],
        stars : {
            type : Number ,
            required : true
        },
        review_count : {
            type : Number ,
            required : true
        },
        is_open : {
            type : Boolean ,
            required : false
        },
        attributes : {
            type : String ,
            required : false
        },
        categories : {
            type : [String] ,
            required : false
        },
        hours : {
            type : String ,
            required : false
        }
    
});

var Favourites = mongoose.model('favourite' , favouriteSchema);
module.exports = Favourites ;