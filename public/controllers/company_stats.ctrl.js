ourApp.controller("CompanyStatsController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  $scope.companyId = parseInt($routeParams.company_id)

  $http({
    method: "GET",
    url: "http://localhost:9393/companies/"+$scope.companyId+"/responses"
  }).success(function(response){
    console.log(response)
    $scope.totalEmployees = response.company_total_employees
    $scope.totalResponses = response.comapny_total_responses
    $scope.companyStats = response.response_stats
  })




}]);