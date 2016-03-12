app.service('Pageviews', function ($http, $q) {

	var pageviews = [{
		page: 'home',
		views: 10
	}, {
		page: 'shop',
		views: 20
	}, {
		page: 'cart',
		views: 30
	}]

	this.getPageViews = function (timestamp) {
		var def = $q.defer();
		def.resolve(pageviews);
		return def.promise;
	}

})