ourApp.controller("MainController", ['$scope', '$http', '$route','$cookies', '$location', function($scope, $http, $route, $cookies, $location){

    $scope.loggedInUser = $cookies.user_id
    $scope.companyId = $cookies.company_id

    $scope.logout = function(){
      delete $cookies.user_id
      delete $cookies.company_id
      // $location.path('/')
      window.location.reload()
    }

    $scope.companyDashboard = function(){
      if($cookies.company_id){
        $location.path('/company_dashboard')
      } else {
        $location.path('/')
      }
    };

}]);
