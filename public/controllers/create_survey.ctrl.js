ourApp.controller("CreateSurveyController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  $scope.companyId = parseInt($routeParams.company_id)

  $http({
    method: "GET",
    url: "http://localhost:9393/attribute_groups"
  }).success(function(response){
    console.log(response)
    $scope.attributeGroups = response
  })

  var getVals = function(){
    var attributeGroups = []
    var checkboxArr = $('input[type=checkbox]:checked')
    for (var i=0;i<checkboxArr.length;i++){
      var value = parseInt($(checkboxArr[i]).val())
      attributeGroups.push(value)
    }
    return attributeGroups
  }

  $scope.createSurvey = function(){
    var surveyDetails = {
      company_id:       $scope.companyId,
      attribute_groups: getVals()
    }
    $http({
      method: 'POST',
      url: 'http://localhost:9393/admins/'+$cookies.user_id+'/companies/'+$cookies.company_id+'/surveys',
      params: surveyDetails
    }).success(function(response){
      console.log(response)
    })
  }

}]);