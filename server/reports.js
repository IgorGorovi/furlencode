/*
    uses the 'path': function() {handler} syntax
*/
var reportingService = require('./reporting-service');

var format = function(x, y, docs){
    var array = [];
    console.log(docs);
    var keys = Object.keys(docs);
    keys.forEach(function(key){
        var a = {};
        a[x] = key;
        a[y] = docs[key];
        array.push(a);
    })

    // [{
    //     page: 'home',
    //     page: 10
    // }, {
    //     page: 'shop',
    //     views: 20
    // }, {
    //     page: 'cart',
    //     views: 30
    // }]
    return array;
}

var handlers = {
    "get": {
        "piechart": function(req, res) {
            var docs = reportingService.get('piechart', false).then(function(docs){
                res.send(format('page', 'views', docs));
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
