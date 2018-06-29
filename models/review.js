const mongoose = require('mongoose');
const schema = mongoose.Schema ;

const  ReviewSchema = new schema({
    business_id : {
        type : String ,
        required : true
    },
    cool : {
        type : Number ,
        required : false
    },
    date : {
        type : String ,
        required : true 
    },
    funny : {
        type : String ,
        required : false 
    },
    review_id : {
        type : String ,
        required : false ,
    },
    stars : {
        type : Number ,
        required : true
    },
    text : {
        type : String ,
        required : true 
    },
    useful : {
        type : Number ,
        required : false
    },
    user_id : {
        type : String ,
        required : true ,
    }
}); 

var Reviews = mongoose.model('Review',ReviewSchema);
module.exports = Reviews ;