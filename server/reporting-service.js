var Q = require('Q');
var dbService = require('./db-service')();
var view = {
    map: function(doc) {
        var array = doc._id.split(':');
        switch (array.length) {
            case 2:
                emit('user', { cookie: array[1] });
                break;
            case 4:
            case 5:
            case 6:
                emit(array[3], { cookie: array[1], page: array[2], timestamp: array[5] });
                break;
            default:
                break;
        }
    },
    reduce: function() {

    }
}

var parse = function() {

}

var piechart = function(unique) {
    var def = Q.defer();
    var options = null;
    if (unique) {
        options = { startkey: 'pageview', endkey: 'pageview_' };
    }
    else {
        options = {};
    }
    dbService.runView(options).then(function(data) {
        var summary = {};
        data.rows.forEach(function(row) {
            if(summary[row.value.page] ===  undefined) {
                summary[row.value.page] = 1;
            }
            else {
                summary[row.value.page]++;
            }
        })
        def.resolve(summary);
    }, function(err) {
        console.log(err);
    });
    return def.promise;
};

module.exports = {
    get: function(type, unique) {
        var promise;
        switch (type) {
            case 'piechart':
                promise = piechart(unique);
                break;
        }
        return promise;
    }
}
