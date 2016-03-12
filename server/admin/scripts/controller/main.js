app.controller('mainCtrl', ['$scope', function($scope){
	$scope.currentView = 'home';
    $scope.reports = [
        'home',
        'pageviews',
        'livedata',
        'timeline'
    ];

    $scope.setView = function (view) {
    	$scope.currentView = view;
    }
}]);
