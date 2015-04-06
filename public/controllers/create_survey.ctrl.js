ourApp.controller("CreateSurveyController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  $scope.companyId = parseInt($routeParams.company_id)
  // $scope.groupsToSend

  $http({
    method: 'GET',
    url: 'http://localhost:3000/attribute_groups'
  }).success(function(response){
    $scope.attributeGroups = response
  })

  $scope.getVals = function(){
    var attributeGroups = []
    var checkboxArr = $('input[type=checkbox]:checked')
    for (var i=0;i<checkboxArr.length;i++){
      var value = parseInt($(checkboxArr[i]).val())
      attributeGroups.push(value)
    }
    createSurvey(attributeGroups)
  }

  var createSurvey = function(groups){
    var surveyDetails = {
      company_id:       $scope.companyId,
      attribute_groups: angular.toJson(groups)
    }
    $http({
      method: 'POST',
      url: 'http://localhost:3000/admins/'+$cookies.user_id+'/companies/'+$cookies.company_id+'/surveys',
      params: surveyDetails
    }).success(function(response){
      console.log(response)
      $location.path('/company_dashboard/'+$scope.companyId)
    })
  }

}]);
