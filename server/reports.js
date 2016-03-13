/*
    uses the 'path': function() {handler} syntax
*/
var url = require('url');
var reportingService = require('./reporting-service');

var format = function(x, y, docs) {
    console.log('*', docs);
    var array = [];

    var keys = Object.keys(docs);
    console.log(keys);
    keys.forEach(function(key) {
        var a = {};
        var newKeyTemp, arrayTemp;
        console.log(key);
        if (docs[key]) {
            if(key.indexOf('/')>-1) {
                arrayTemp = key.split('/');
                newKeyTemp = arrayTemp[arrayTemp.length - 1];
            }
            // a[x] = key;
            a[x] = newKeyTemp;
            a[y] = docs[key];
            array.push(a);
        }
    });
    return array;
}

var handlers = {
    "get": {
        "piechart": function(req, res) {
            var docs = reportingService.get('piechart', false).then(function(docs) {
                res.send(format('page', 'views', docs));
            });
        },
        "clickchart": function(req, res) {
            var docs = reportingService.get('clickchart', false).then(function(docs) {
                console.log('P', docs);
                res.send(format('page', 'clicks', docs));
            });
        },
        "exitchart": function(req, res) {
            var docs = reportingService.get('exitchart', false).then(function(docs) {
                console.log('E', docs);
                res.send(format('page', 'exits', docs));
            });
        },
        "purchasechart": function(req, res) {
            var docs = reportingService.get('purchasechart', false).then(function(docs) {
                console.log('K', format('page', 'purchase', docs));
                res.send(format('page', 'purchase', docs));
            });
        }
    },
    "post": {

    }
};

module.exports = function(app, type, prefix) {
    var paths = Object.keys(handlers[type]);
    paths.forEach(function(path, index) {
        app[type](prefix + '/' + path, handlers[type][path]);
    });
};
