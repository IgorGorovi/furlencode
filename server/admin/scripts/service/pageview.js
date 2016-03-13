app.factory('Pageviews', function ($http, $q, serviceUrl) {
	return {
		getPageViews : function (timestamp) {
			var def = $q.defer();
			$http.get(serviceUrl + '/reports/piechart').then(def.resolve, def.reject);
			return def.promise;
		}
	}
})