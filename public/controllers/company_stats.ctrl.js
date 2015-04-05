ourApp.controller("CompanyStatsController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  $scope.companyId = parseInt($routeParams.company_id)

  $http({
    method: "GET",
    url: "http://localhost:3000/companies/"+$scope.companyId+"/responses"
  }).success(function(response){
    console.log(response)
    $scope.companyInfo = response.company_info
    $scope.companyStats = response.response_stats
  })
}]);
