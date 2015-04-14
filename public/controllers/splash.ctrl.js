ourApp.controller("SplashController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location){

// CHANGE TO HEROKU URL ONCE API IS LIVE:
  $http.get(API_ROOT).success(function(response){
    $scope.companies = response
  })

  $scope.getCompanyInfo = function(companyId) {
    console.log(companyId)
    $http({
      method: "GET",
      url: API_ROOT + "/companies/"+companyId+"/responses"
    }).success(function(response){
      console.log(response)
      $scope.companyInfo = response.company_info
      $scope.companyStats = response.response_stats
    })
  }

}]);
