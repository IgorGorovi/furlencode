app.controller("PageViewCtrl", function ($scope, Pageviews) {
    $scope.chartObject = {};
    
    $scope.chartObject.type = "PieChart";

    $scope.chartObject.data = {"cols": [
        {id: "u", label: "Users", type: "string"},
        {id: "p", label: "pageviews", type: "number"}
    ], "rows": []};

    /*$scope.chartObject.options = {
        'title': 'Page views'
    };*/

    Pageviews.getPageViews().then(function (data) {
    	$scope.chartObject.data.rows = [];
    	data.data.forEach(function (pageviews) {
    		var obj = {
    			c : [{
    				v: pageviews.page
    			}, {
    				v: pageviews.views
    			}]
    		}
    		$scope.chartObject.data.rows.push(obj);
    	})
    })
});