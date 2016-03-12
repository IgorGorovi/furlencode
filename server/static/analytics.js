var config = {
    url: 'http://localhost:7076/api'
}

var hitTypes = {
    'pageview': function() {
        return {
            'location': window.location.href,
            'title': document.title ? document.title : ''
        }
    },
    'event': {

    }
}

var img = document.createElement('img');

function getQueryString(json) {
    var queryString = ''
    var keys = Object.keys(json);
    keys.forEach(function(key) {
        queryString += encodeURIComponent(queryString) ? '&' : ''; //for first time
        queryString += key + '=' + encodeURIComponent(json[key]);
    })
    return queryString;
}

function Analytics(userId) {
    this.userId = userId;
    this.send = function(hitType, data) {
        if (!data) {
            data = hitTypes[hitType]();
        }
        img.src = config.url + '/' + hitType + '?' + getQueryString(data);
    }
}
