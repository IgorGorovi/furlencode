var socket = require('./socket-service');
module.exports = function(feed){
    feed.on('change', function(change) {
        console.log("change: ", change);
    });
    feed.follow();
};
