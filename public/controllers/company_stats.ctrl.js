ourApp.controller("CompanyStatsController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  $scope.getCompanyInfo = function(companyId) {
    $http({
      method: "GET",
      url: API_ROOT + "/companies/"+companyId+"/responses"
    }).success(function(response){
      $scope.companyInfo = response.company_info
      $scope.companyStats = response.response_stats
    })
  };

}]);
