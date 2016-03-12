var app = angular.module("platform",[]);


app.controller('main', ['$scope', function($scope){
    $scope.reports = [
        'Home',
        'Page Views',
        'Live Data'
    ];
}]);
