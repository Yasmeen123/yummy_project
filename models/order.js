var mongoose = require('mongoose');
var schema = mongoose.Schema ;

var menuOrder = new schema ({
    dish_name :{
        type : String ,
        required : true
    },
    price : {
        type : Number ,
        required : true
    }
});

var orderSchema = new schema ({
    user_id : {
        type : String ,
        required : true
    },
    business_id : {
        type : String ,
        required : true
    },
    order : [menuOrder]
});

var Orders = mongoose.model('Order' , orderSchema);
module.exports = Orders ; 
