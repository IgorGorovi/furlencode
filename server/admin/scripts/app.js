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

            'livedata@main': { 
            	templateUrl: 'views/main/livedata.html'
            },

            'timeline@main': { 
            	templateUrl: 'views/main/timeline.html'
            }
       }
    });
});