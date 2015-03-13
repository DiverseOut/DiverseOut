var ourApp = angular.module('ourApp', ['ngSanitize', 'ngRoute', 'ngCookies'])

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
      when('/signin_signup', {
        templateUrl: '../partials/signin_signup.html',
        // controller: 'SigninSignupController'
      }).
      when('/home', {
        templateUrl: '../partials/home.html',
        // controller: 'MainController'
      }).
      when('/company_dashboard', {
        templateUrl: '../partials/company_dashboard.html',
        // controller: 'CompanyDashboardController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
