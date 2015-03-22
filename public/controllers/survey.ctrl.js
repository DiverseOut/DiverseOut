ourApp.controller("ShowSurveyController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  $scope.companyId = parseInt($routeParams.company_id)
  $scope.surveyId = parseInt($routeParams.survey_id)

  $('.list-group-item').click(function(){
    $(this).css("background-color","blue")
    console.log($(this))
  })

// create multiple responses on each check
  $http({
    method: "GET",
    url: 'http://localhost:9393/companies/'+$scope.companyId+'/surveys/'+$scope.surveyId
  }).success(function(response){
    console.log(response)
    $scope.surveyInfo = response
  })

}]);