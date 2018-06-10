const mongoose = require('mongoose');
const schema = mongoose.Schema ;

const  PhotoSchema = new schema ({
    business_id : {
        type : String ,
        required : true
    },
    caption : {
        type : String 
    },
    label : {
        type : String
    },
    photo_id : {
        type : String ,
        required : true
    },
},{
        timestamps : true
    }); 
    
    var Photos = mongoose.model('Photo',PhotoSchema);
    module.exports = Photos ;

