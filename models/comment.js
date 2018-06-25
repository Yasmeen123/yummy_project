var mongoose = require('mongoose');
var schema = mongoose.Schema ;

var commentSchema = new schema ({
    id : {
        type : String ,
        required : true
    },
    name : {
        type : String , 
        required : true
    },
    comment : {
        type : String ,
        required : true
    },
    image : {
         type : String ,
         required : true
    }
});

var Comments = mongoose.model('Comment' , commentSchema);
module.exports = Comments ;
