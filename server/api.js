/*
    uses the 'path': function() {handler} syntax
*/

var handlers = {
    "get": {
        "pageview": function(req, res) {
            console.log("I am very good !");
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
