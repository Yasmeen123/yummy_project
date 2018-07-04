const mongoose = require('mongoose');
const schema = mongoose.Schema ;

const  RecommendationSchema = new schema ({
    business_id : {
        type : String ,
        required : true
    },
    name: {
        type : String ,
        required : true
    },
    stars : {
        type : String ,
        required : true
    },
    user_id : {
        type : String ,
        required : true
    }
    }); 
    
    var Recommendations = mongoose.model('Recommendation',RecommendationSchema);
    module.exports = Recommendations ;