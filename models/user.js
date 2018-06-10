const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    user_id : {
        type : String ,
        required : true , 
        unique : true
    },
    name : {
        type : String ,
        required : true ,
        unique : true
    },
    review_count : {
        type : Number ,
        required : true
    },
    yelping_since : {
        type : String ,
        required : true 
    },
    friends : {
        type : [String] ,
        required : true
    },
    location : {
        type : String , 
        required : false
    },
    age : {
        type : Number ,
        required : false
    },
    gender : {
        type : String ,
        required : false
    },
    image : {
        type : String ,
        required : false
    }
},{
    timestamps : true
});

var Users = mongoose.model('User',UserSchema);
module.exports = Users ;