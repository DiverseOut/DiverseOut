ourApp.controller("CompanyStatsController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  // $scope.companyId = parseInt($routeParams.company_id)
  // console.log(companyId)
  $scope.getCompanyInfo = function(companyId) {
    console.log(companyId)
    $http({
      method: "GET",
      url: API_ROOT + "/companies/"+companyId+"/responses"
    }).success(function(response){
      console.log(response)
      $scope.companyInfo = response.company_info
      $scope.companyStats = response.response_stats
      debugger
    })
  }

}]);
