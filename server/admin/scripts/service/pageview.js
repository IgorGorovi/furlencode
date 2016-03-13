app.service('Pageviews', function ($http, $q, serviceUrl) {

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
		$http.get(serviceUrl + '/reports/piechart').then(def.resolve, def.reject);
		return def.promise;
	}

})