app.controller('mainCtrl', ['$scope', function($scope){
	$scope.currentView = 'home';

    /*
        All data are real time:
        geography is event ip->geolocation
        * timeline should be filtered for flows and funnels
        pageviews:
            live pie (total, YTD, 24 hours)
            bar graph of page views
            give switch
        livedata is an event log
    */


    $scope.reports = [
        'home',
        'pageviews',
        'geography',
        'timeline',
        'livedata'
    ];

    $scope.setView = function (view) {
    	$scope.currentView = view;
    }
}]);
