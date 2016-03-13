app.controller('mainCtrl', ['$scope', 'Events', 'Pageviews', function($scope, Events, Pageviews) {
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


    $scope.reports = [{
        id: 'home',
        name: 'Home'
    }, {
        id: 'pageviews',
        name: 'Page view'
    }, {
        id: 'events',
        name: 'Events'
    }, {
        id: 'livedata',
        name: 'Live data'
    }];

    $scope.setView = function(view) {
        $scope.currentView = view;
    }

    $scope.clicks = [];
    $scope.pageViews = [];
    $scope.exits = [];

    var summer = function(data, key) {
        var sum = 0;
        data.forEach(function(o) {
            sum += o[key];
        });
        return sum;
    }

    Events.getClicks().then(function(data) {
        $scope.clicks = summer(data.data, 'clicks');
    });

    Events.getUnloads().then(function(data) {
        $scope.exits = summer(data.data, 'exits');
    });

    Pageviews.getPageViews().then(function(data) {
        $scope.pageViews = summer(data.data, 'views');
    });

}]);
