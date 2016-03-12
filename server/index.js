//requires
var furlen = require('nano')('http://admin:V3ryS3cure@localhost:5984/furlencode');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5

//intializations
var app = express();
var upload = multer(); // for parsing multipart/form-data


//set app configuration
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//define static routes
app.use('/', express.static(__dirname + '/admin'));
app.use('/static', express.static(__dirname + '/static'));

//init() api routes
var api = require('./api')(app, 'get', '/api');
app.listen(7076);

