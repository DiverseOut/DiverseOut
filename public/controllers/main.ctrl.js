ourApp.controller("MainController", ['$scope', '$http', '$route','$cookies', '$location', function($scope, $http, $route, $cookies, $location){

    console.log("USER COOKIE: "+$cookies.user_id+", COMPANY COOKIE:"+$cookies.company_id)

    $scope.loggedInUser = $cookies.user_id
    $scope.companyId = $cookies.company_id

    $scope.logout = function(){
      delete $cookies.user_id
      delete $cookies.company_id
      $location.path('/')
    }

    $scope.companyDashboard = function(){
      if($cookies.company_id){
        $location.path('/company_dashboard')
      } else {

      }
    }

}]);
