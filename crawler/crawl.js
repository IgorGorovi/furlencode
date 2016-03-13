var sitemap = require('./sitemap');
var phantom = require('phantom');
var urls = {};
var USERS = 5;
var config = {
    site: "http://localhost:7076/site"
};

var flatten = function(path, child, parent) {
    return parent;
}
urls = flatten('', {}, sitemap);
console.log(urls);

function randomizer(array) {
    var number = Math.sin(Math.random());
    console.log(number);
    return (Math.ceil(number* 10) % array.length);
}

function crawl() {
    var array = Object.keys(urls);

    // console.log(randomizer(array), array.length);
    // request(config.site + array[randomizer(array)].replace('.', ''), function(err, response, body) {
    //     if (!err) {
    //         console.log('done, body', body);
    //     }
    // });
    phantom.create().then(function(ph) {
        ph.createPage().then(function(page) {
            array.forEach(function(url) {
                page.open(config.site + array[randomizer(array)].replace('.', '')).then(function(status) {
                    page.property('content').then(function(content) {
                        console.log(content);
                        page.close();
                        ph.exit();
                    });
                });
            });

        });
    });
}
for (var i = 0; i < USERS; i++) {
    crawl();
}
