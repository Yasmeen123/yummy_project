var express = require('express');
var cors = require('cors');

app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:4200'];

var corsOptionsDelegate = (req, cb) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    cb(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);