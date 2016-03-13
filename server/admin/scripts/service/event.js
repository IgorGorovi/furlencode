app.service('Events', function ($http, $q, serviceUrl) {
	this.clicks = [];
	this.unloads = [];
	this.purchases = [];

	this.getClicks = function () {
		var def = $q.defer();
		if (this.clicks.length > 0) {
			def.resolve(this.clicks);
		}
		else {
			$http.get(serviceUrl + '/reports/clickchart').then(function (data) {
				this.clicks = data;
				def.resolve(data);
			}.bind(this), def.reject);
		}
		return def.promise;
	}

	this.getUnloads = function () {
		var def = $q.defer();
		if (this.unloads.length > 0) {
			def.resolve(this.unloads);
		}
		else {
			$http.get(serviceUrl + '/reports/exitchart').then(function (data) {
				this.unloads = data;
				def.resolve(data);
			}.bind(this), def.reject);
		}
		return def.promise;
	}

	this.getPurchases = function () {
		var def = $q.defer();
		if (this.purchases.length > 0) {
			def.resolve(this.purchases);
		}
		else {
			$http.get(serviceUrl + '/reports/purchasechart').then(function (data) {
				console.log(data);
				this.purchases = data;
				def.resolve(data);
			}.bind(this), def.reject);
		}
		return def.promise;
	}


});