const mongoose = require('mongoose');
const schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new schema({
    user_id : {
        type : String ,
        required : false 
    },
    facebookId: String,
    name : {
        type : String ,
        required : false ,
    },
    firstname : {
        type : String ,
        required : false 
    },
    lastname : {
        type : String ,
        required : false 
    },
    admin : {
        type : Boolean ,
        default : false
    },
    review_count : {
        type : Number ,
        required : false
    },
    friends : {
        type : [String] ,
        required : false
    },
    image : {
        type : String ,
        required : false
    }
});

userSchema.plugin(passportLocalMongoose);
var Users = mongoose.model('User',userSchema);
module.exports = Users ;