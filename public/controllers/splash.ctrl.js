ourApp.controller("SplashController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location){

// CHANGE TO HEROKU URL ONCE API IS LIVE:
  $http.get("http://localhost:3000/").success(function(response){
    $scope.companies = response
  })

}]);
