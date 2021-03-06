var url = require('url');
var Q = require('Q');
var realtime = require('./realtime');

var checkDoc = function(db, id) {
    var def = Q.defer();
    db.head(id, function(err, _, headers) {
        if (err) {
            def.reject(err);
        } else {
            def.resolve(headers);
        }
    })
    return def.promise;
}

var insert = function(db, doc) {
    var def = Q.defer();
    db.insert(doc, function(err, body) {
        if (!err) {
            def.resolve(body);
        } else {
            def.reject(err);
        }
    })
    return def.promise;
}

//db = nano
var post = function(db, type, data) {
    var id = null;
    var doc = null;
    if (data === undefined) {
        doc = {};
    } else {
        doc = data;
    }
    switch (type) {
        case 'user':
            id = 'user:' + data.cookie
            doc._id = id;
            break;
        case 'pageview':
            data.path = url.parse(data.location).pathname;
            //approximation - :. means home or WEBROOT
            id = 'user:' + data.cookie + ':.' + data.path + ':' + type + ':time:' + Date.now();
            doc._id = id;
            break;
        case 'fa-event':
            data.path = url.parse(data.location).pathname;
            id = 'user:' + data.cookie + ':.' + data.path + ':' + data['fa-event-type'] + ':time:' + Date.now();
            doc._id = id;
            break;
    }
    checkDoc(db, doc._id).then(function(headers) {
        //headers.etag will have the revision number from head query.
    }, function(err) {
        if (err.statusCode == 404) {
            insert(db, doc).then(function() {
                console.log('successfully created user', doc._id);
            }, function(err) {
                console.log('Error inserting document', err);
            });
        }
    });
}
var furlen = null;
module.exports = function(db) {
    furlen = (!furlen && db) ? db : furlen;
    /*
        follow real time updates to the reporting db
    */
    realtime(furlen.follow({ since: "now" }));

    return {
        send: function(type, data) {
            //prepare
            post(furlen, type, data);

        },
        runView: function(options, view) {
            var def = Q.defer();
            // if (options) {
            furlen.view('birds-view', view, options, function(err, body) {
                if (!err) {
                    def.resolve(body);
                } else {
                    def.reject(err);
                }
            });
            // }
            return def.promise;
        }
    }
}
