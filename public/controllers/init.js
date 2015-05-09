var ourApp = angular.module('ourApp', ['ngSanitize', 'ngRoute', 'ngCookies'])

// ToDo: change this root URL when deploy!
var API_ROOT = "http://localhost:3000/"

ourApp.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $routeProvider.
      when('/', {
        templateUrl: '../partials/splash.html'
      }).
      when('/signin', {
        templateUrl: '../partials/signin.html'
      }).
      when('/signup', {
        templateUrl: '../partials/signup.html'
      }).
      when('/home', {
        templateUrl: '../partials/home.html'
      }).
      when('/company_dashboard/:company_id', {
        templateUrl: '../partials/company_dashboard.html'
      }).
      when('/create_company', {
        templateUrl: '../partials/create_company.html'
      }).
      when('/create_survey/:company_id', {
        templateUrl: '../partials/create_survey.html'
      }).
      when('/edit_company_info/:company_id', {
        templateUrl: '../partials/edit_company_info.html'
      }).
      when('/companies/:company_id/surveys/:survey_id', {
        templateUrl: '../partials/survey.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
