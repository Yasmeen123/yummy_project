var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
var cors = require('cors');
var sockIO = require('socket.io')(); 
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Restaurants = require('./models/restaurant');
var Reviews = require('./models/review');
var Users = require('./models/user');
var Orders = require('./models/order');
var Recommendations = require('./models/recommendation');

var index = require('./routes/index');
var users = require('./routes/users');
var reviewRouter = require('./routes/reviewRouter');
var photoRouter = require('./routes/photoRouter');
var userRouter = require('./routes/userRouter');
var restaurantRouter = require('./routes/restaurantRouter');
var menuRouter = require('./routes/menuRouter');
var orderRouter = require('./routes/orderRouter');
var favouriteRouter = require('./routes/favoutiteRouter');
var recommendationRouter = require('./routes/recommendationRouter');

var app = express();

const url = config.mongoUrl;
//const url = 'mongodb://yasmeen:yasmeen123@ds261660.mlab.com:61660/yummy_project';
const connect = mongoose.connect(url);
connect.then((db) => {
   console.log('connected correctly to the server');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(cors());
app.use('/', index);
app.use('/users', users);

app.use('/user', userRouter);
app.use('/reviews', reviewRouter);
app.use('/photos', photoRouter);
app.use('/menus', menuRouter);
app.use('/restaurants', restaurantRouter);
app.use('/orders', orderRouter);
app.use('/favourite' , favouriteRouter);
app.use('/recommend',recommendationRouter);

app.sockIO = sockIO ;
sockIO.on('connection', function(socket){                
  socket.on('create notification', function(data){   
    socket.broadcast.emit('new notification',data);  
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
