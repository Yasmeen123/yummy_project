var mongoose = require('mongoose');
var schema = mongoose.Schema ;

const menuSchema = new schema ({
    business_id : {
        type : String ,
        required : true
    },
    dish_name :{
        type : String ,
        required : true
    },
    restaurant_name : {
        type : String ,
        required : true
    },
    price : {
        type : Number ,
        required : true
    },
    rating : {
        type : Number ,
        required : true
    }
});

var Menus = mongoose.model('Menu',menuSchema);
module.exports = Menus ;