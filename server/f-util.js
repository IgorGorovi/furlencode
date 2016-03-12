module.exports = {
    prepare: function(req) {
        /*
            get client data:
                1. ip-
                2. cookie information
                3.
        */

        var doc = {};
        var query = Object.keys(req.query);
        query.forEach(function(q){
            doc[q] = req.query[q];
        });
        var ipArray = req.ip.split(':')
        if (req.ip === undefined) {
            req.ip = ":::x.x.x.x";
        }
        doc.ip = ipArray[ipArray.length - 1];
        doc.cookie = req.cookies.FA;
        return doc;
    }
}
