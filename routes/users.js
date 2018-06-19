var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var bodyParser = require('body-parser');
var authenticate = require('../authenticate');
var cors = require('../routes/cors');

router.use(bodyParser.urlencoded({ extended: false }));

/* GET users listing. */
router.get('/',cors.corsWithOptions , authenticate.verifyUser , function(req, res, next) {
  res.send('respond with a resource');
});

router.options('*',cors.corsWithOptions);
router.post('/signup',cors.corsWithOptions ,  (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

router.post('/login',cors.corsWithOptions , passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token : token , status: 'You are successfully logged in!'});
});

router.get('/logout',cors.corsWithOptions ,  (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
});

module.exports = router;
