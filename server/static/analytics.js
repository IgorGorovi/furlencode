var config = {
    url: 'http://localhost:7076/api'
}

var hitTypes = {
    'pageview': function() {
        return {
            'location': window.location.href,
            'title': document.title ? document.title : '',
            'path': window.location.href.pathname
        }
    },
    'event': {
        category: null, 
        action: null, 
        label: null,
        value: null
    }
}

var analyticsAttributes = {
    'fa-click' : true
};

var img = document.createElement('img');

function getQueryString(json) {
    var queryString = ''
    var keys = Object.keys(json);
    keys.forEach(function(key) {
        queryString += queryString ? '&' : ''; //for first time
        queryString += key + '=' + json[key];
    })
    return queryString;
}

function getAllElementsWithAnalyticAttribute () {
    var attributes = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++)
    {
        Array.prototype.slice.call(allElements[i].attributes).forEach(function (attribute) {
            if (analyticsAttributes[attribute.name]) {
                attributes.push(attribute.name);
            }
        })
    }

    attributes = attributes.filter(function (e, i, arr) {
        return arr.lastIndexOf(e) === i;
    });

    return attributes;
}

var attributeUsed = getAllElementsWithAnalyticAttribute();
var listeners = '';

attributeUsed.forEach(function (attribute) {
    listeners += listeners ? ',' : '';
    listeners += attribute.replace('fa-', '');
    console.log('listeners :', listeners);
});

window.addEventListener(listeners, function (e) {
    var data = {
        hitType: 'event',
        category: e.target.getAttribute('fa-' + event.type),
        action: e.target.getAttribute('fa-action')
    };
    console.log(data);
})

function Analytics() {
    this.send = function(hitType, data) {
        if (!data) {
            data = {};
        }

        switch (hitType) {
            case 'pageview':
                if (!data) data = {};
                data.hitType = hitType,
                data.location = window.location.href;
                data.title =  document.title ? document.title : '';
                data.path = window.location.href.pathname;
                break;

            case 'event' :
                if (!data || !data.category && !data.action) return;
                break;

            default:
                return; 
        }

        img.src = config.url + '/' + hitType + '?' + getQueryString(data);
    }
}
