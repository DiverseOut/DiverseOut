ourApp.controller("CreateSurveyController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  $scope.companyId = $routeParams.company_id

  console.log($scope.companyId)

  $http({
    method: "GET",
    url: "http://localhost:9393/attribute_groups"
  }).success(function(response){
    console.log(response)
    $scope.attributeGroups = response
  })

  // Get all attribute groups to display them

  }]);