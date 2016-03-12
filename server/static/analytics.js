var config = {
    url: 'http://localhost:7076/api'
}

/*
    TRACKED ATTRIBUTE LIST

*/
var FA = null;
var TRACKED = {};

// var hitTypes = {
//     'pageview': function() {
//         return {
//             'location': window.location.href,
//             'title': document.title ? document.title : '',
//             'path': window.location.href.pathname
//         }
//     }
// }

/*
    I like this approach for sure:
    so fa-event = "<dom-event>" OR
    fa-event = "click, mousetouch"
*/
(function getAllElementsWithAnalyticAttribute() {
    var list = [];

    var allElements = document.getElementsByTagName('*');
    // console
    for (var i = 0; i < allElements.length; i++) {
        Array.prototype.slice.call(allElements[i].attributes).forEach(function(attribute) {
            /*
                ATTENTION: important comparison
            */
            if (attribute.name === 'fa-event-type') {
                list.push(attribute.value);
            }
        });
    }
    list.forEach(function(attribute) {
        TRACKED[attribute] = true;
    });
})();

window.addEventListener(Object.keys(TRACKED).join(','), function(e) {
    console.log('*', e.target.attributes);
    var attribute;
    var data = {
        hitType: 'fa-event'
    };
    for (var i = 0; i < e.target.attributes.length; i++) {
        attribute = e.target.attributes[i];
        // e.target.attributes.forEach(function(attribute) {
        if (attribute.name.slice(0, 3) === 'fa-') {
            data[attribute.name] = attribute.value;
        }
    }
    // });
    data.location = window.location.href;
    FA.send('fa-event', data);
});

/*
    This is our analytics object

*/
function Analytics() {
    /*
        this should stay encapsulated here

    */
    FA = this;
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

    this.send = function(hitType, data) {
        if (!data) {
            data = {};
        }
        switch (hitType) {
            case 'pageview':
                data.hitType = hitType,
                    data.location = window.location.href;
                data.title = document.title ? document.title : '';
                data.path = window.location.href.pathname;
                break;

            case 'fa-event':
                /*
                    addEventListener registration will take care of publishing data
                */
                break;
        }
        img.src = config.url + '/' + hitType + '?' + getQueryString(data);
    }
}
