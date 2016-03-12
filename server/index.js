//requires
var furlen = require('nano')('http://admin:V3ryS3cur3@localhost:5984/furlencode');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var multer = require('multer'); // v1.0.5
var dbService = require('./db-service')(furlen);
//intializations
var app = express();
var upload = multer(); // for parsing multipart/form-data


//set app configuration
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

//for CORS
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

//define static routes
app.use('/', express.static(__dirname + '/admin'));
var reports = require('./reports')(app, 'get','/reports');
//set cookies
app.use('/', function(req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.FA;
    if (cookie === undefined) {
        // no: set a new cookie
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie('FA', randomNumber, { maxAge: 900000, httpOnly: true });
        dbService.send('user', {
            cookie: randomNumber
        });
    } else {
        console.log('cookie exists', cookie, req.url);
    }
    next(); // <-- important!
});

app.use('/static', express.static(__dirname + '/static'));
//init() api routes
var api = require('./api')(app, 'get', '/api');
app.listen(7076);
