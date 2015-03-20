ourApp.controller("CompanyDashboardController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

    $scope.companyId = $routeParams.company_id

    $http({
      method: 'GET',
      url: 'http://localhost:9393/companies/'+$scope.companyId,
    }).success(function(response){
      console.log(response)
      $scope.company = response.company
      $scope.surveys = response.surveys
    })

}]);