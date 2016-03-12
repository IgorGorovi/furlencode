var config = {
    url: 'http://localhost:7076/api'
}

/*
    TRACKED ATTRIBUTE LIST

*/
var FA = null;
var TRACKED = {};

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
                console.log('attribute.value', attribute.value);
                list.push(attribute.value);
            }
        });
    }
    list.forEach(function(attribute) {
        TRACKED[attribute] = true;
    });
})();
Object.keys(TRACKED).forEach(function(eventType) {
    console.log(eventType);
    var genericHandler = function(e) {
        console.log('*', e);
        var attribute;
        var data = {
            hitType: 'fa-event'
        };
        /*
            console.log(e.target);
        */
        for (var i = 0; i < e.target.attributes.length; i++) {
            attribute = e.target.attributes[i];
            console.log('attribute', attribute);
            // e.target.attributes.forEach(function(attribute) {
            if (attribute.name.slice(0, 3) === 'fa-') {
                data[attribute.name] = attribute.value;
            }
        }
        // });
        data.location = window.location.href;
        FA.send('fa-event', data);
    };
    window.addEventListener(eventType, genericHandler);
});
// window.addEventListener(Object.keys(TRACKED).join(','), );
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
                data.hitType = hitType;
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
