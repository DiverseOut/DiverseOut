ourApp.controller("ShowSurveyController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  $scope.companyId = parseInt($routeParams.company_id)
  $scope.surveyId = parseInt($routeParams.survey_id)

  $scope.postSuccessArr = []

  $http({
    method: 'GET',
    url: 'http://localhost:9393/companies/'+$scope.companyId+'/surveys/'+$scope.surveyId,
  }).success(function(response){
    console.log(response)
    $scope.surveyInfo = response
  })

  $scope.getVals = function(){
    var attributeGroups = []
    var selectedArr = $('option:selected')
    for (var i=0;i<selectedArr.length;i++){
      var value = parseInt($(selectedArr[i]).val())
      // attributeGroups.push({
      //   company_id: $scope.companyId
      //   employee_type_id:
      //   attribute_id: value
      // })
    }
    postResponses(attributeGroups)
    console.log("in getVals")
  }

// create multiple responses on each check

  var postResponses = function(responseArr){

    function httpPost(param){
      $http({
        method: 'POST',
        url: 'http://localhost:9393/companies/'+$scope.companyId+'/responses',
        params: param
      }).success(function(response){
        postSuccessArr.push(response)
      })
    }

    for (i=0;i<responseArr.length;i++){
      httpPost(responseArr[i])
    }

    console.log($scope.postSuccessArr)

  }


}]);