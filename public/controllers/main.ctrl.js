ourApp.controller("MainController", ['$scope', '$http', '$route','$cookies', '$location', function($scope, $http, $route, $cookies, $location){

    console.log("USER COOKIE: "+$cookies.user_id+", COMPANY COOKIE:"+$cookies.company_id)

    // REFACTOR THESE FIRST 2 HTTP CALLS SO DONT HAVE TO CALL THEM EACH TIME TO GET WELCOME GREETING
    $http({
      method: 'GET',
      url: API_ROOT + 'admins/'+$cookies.user_id
    }).success(function(response){
      console.log(response)
      $scope.loggedInUser = response
    })

    $http({
      method: 'GET',
      url: API_ROOT + 'companies/'+$cookies.company_id
    }).success(function(response){
      console.log(response)
      $scope.company = response.company
    })

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
