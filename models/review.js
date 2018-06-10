const mongoose = require('mongoose');
const schema = mongoose.Schema ;

const  ReviewSchema = new schema({
    business_id : {
        type : String ,
        required : true
    },
    cool : {
        type : Number ,
        required : true
    },
    date : {
        type : String ,
        required : true 
    },
    funny : {
        type : String ,
        required : true 
    },
    review_id : {
        type : String ,
        required : true ,
        unique : true
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
        required : true
    },
    user_id : {
        type : String ,
        required : true ,
        unique : true
    },
},{
    timestamps : true
}); 

var Reviews = mongoose.model('Review',ReviewSchema);
module.exports = Reviews ;