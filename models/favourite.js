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
       }
});

var Favourites = mongoose.model('favourite' , favouriteSchema);
module.exports = Favourites ;