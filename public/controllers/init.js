var ourApp = angular.module('ourApp', ['ngSanitize', 'ngRoute', 'ngCookies'])

ourApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/splash.html'
      }).
      when('/signin', {
        templateUrl: 'partials/signin.html'
      }).
      when('/signup', {
        templateUrl: 'partials/signup.html'
      }).
      when('/home', {
        templateUrl: 'partials/home.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
