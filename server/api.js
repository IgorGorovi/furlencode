/*
    uses the 'path': function() {handler} syntax
*/
var dbService = require('./db-service')();
var utils = require('./f-util');

var handlers = {
    "get": {
        "pageview": function(req, res) {
            var doc = utils.prepare(req);
            dbService.send('pageview', doc);
            res.send('welcome !');
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
