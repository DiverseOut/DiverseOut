var ourApp = angular.module('ourApp', ['ngSanitize', 'ngRoute', 'ngCookies'])

// Global var to be more DRY!
var API_ROOT = "http://localhost:3000/"

// ourApp.config(['$httpProvider', function($httpProvider){
//   //Enable cross domain calls
//   $httpProvider.defaults.useXDomain = true;

//   //Remove the header used to identify ajax call  that would prevent CORS from working
//   delete $httpProvider.defaults.headers.common['X-Requested-With'];

//   }
// ]);

ourApp.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {


    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $routeProvider.
      when('/', {
        templateUrl: '../partials/splash.html',
        // controller: 'SplashController'
      }).
      when('/signin', {
        templateUrl: '../partials/signin.html',
        // controller: 'SigninSignupController'
      }).
      when('/signup', {
        templateUrl: '../partials/signup.html',
        // controller: 'SigninSignupController'
      }).
      when('/home', {
        templateUrl: '../partials/home.html',
        // controller: 'MainController'
      }).
      when('/company_dashboard/:company_id', {
        templateUrl: '../partials/company_dashboard.html',
        // controller: 'CompanyDashboardController'
      }).
      when('/create_company', {
        templateUrl: '../partials/create_company.html',
        // controller: 'CompanyDashboardController'
      }).
      when('/create_survey/:company_id', {
        templateUrl: '../partials/create_survey.html',
        // controller: 'CompanyDashboardController'
      }).
      when('/companies/:company_id/surveys/:survey_id', {
        templateUrl: '../partials/survey.html',
        // controller: 'CompanyDashboardController'
      }).
      when('/companies/:company_id/company_stats', {
        templateUrl: '../partials/company_stats.html',
        // controller: 'CompanyDashboardController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
