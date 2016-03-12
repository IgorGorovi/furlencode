/*

    .com/index.html?utm_source=google&

/user/cookie-name
{
    type: cookie
}

/user/cookie-name/page-view/<page-id>/time/<server-time-stamp> {
    query
}
/user/cookie-name/page-view/<page-id>/event/<event-id>
{

}

*/
var url = require('url');
var Q = require('Q');
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
            id = 'user:' + data.cookie + ':' + type + ':.' + data.path + ':time:' + Date.now();
            doc._id = id;
            break;
            //case 'event':
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
    return {
        send: function(type, data) {
            //prepare
            console.log('data', data);
            post(furlen, type, data);

        }
    }
}
