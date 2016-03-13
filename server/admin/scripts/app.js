var app = angular.module("platform",['ui.router', 'googlechart'])
.config(function($stateProvider, $urlRouterProvider) {
  	$urlRouterProvider.otherwise("/");

  	$stateProvider
    .state('main', {
      url: "/",
      views: {
            '': { 
              templateUrl: 'views/main.html',
              controller: 'mainCtrl'
            },

            'home@main': { 
            	templateUrl: 'views/main/home.html'
            },

            'pageviews@main': {
            	templateUrl: 'views/main/pageviews.html',
              controller: 'PageViewCtrl'
            },

            'events@main': {
                templateUrl: 'views/main/events.html',
                controller: 'EventsCtrl'
            },

            'livedata@main': {
            	templateUrl: 'views/main/livedata.html'
            }
       }
    });
}).constant('serviceUrl', 'http://172.20.10.3:7076');
