ourApp.controller("ShowSurveyController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  $scope.companyId = parseInt($routeParams.company_id)
  $scope.surveyId = parseInt($routeParams.survey_id)

  $http({
    method: 'GET',
    url: 'http://localhost:9393/companies/'+$scope.companyId+'/surveys/'+$scope.surveyId,
  }).success(function(response){
    console.log(response)
    $scope.surveyInfo = response
  })

  $scope.getVals = function(){
    // REFACTOR so I can use same function to get vals for 'option' and 'input'?
    var getEmployeeVals = function(arr){
      var arrToReturn = []
      for (var i=0;i<arr.length;i++){
        var value = parseInt($(arr[i]).val())
        arrToReturn.push(value)
      }
      return arrToReturn
    }

    var employeeTypes = $('input[type=checkbox]:checked')

    var employees = getEmployeeVals(employeeTypes)

    var attributeGroups = []
    var selectedArr = $('option:selected')
    for (var i=0;i<selectedArr.length;i++){
      var value = parseInt($(selectedArr[i]).val())
      attributeGroups.push({
        company_id: $scope.companyId,
        attribute_id: value,
        employee_types: angular.toJson(employees)
      })
    }
    postResponses(attributeGroups)
  }

// create multiple responses on each check

  var postResponses = function(responseArr){

    var postSuccessArr = []

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

    // console.log(postSuccessArr)

  }

}]);