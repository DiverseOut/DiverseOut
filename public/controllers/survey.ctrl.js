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

// Function too long! Refactor
  $scope.getVals = function(){
    var getSelectedVals = function(arr){
      var arrToReturn = []
      for (var i=0;i<arr.length;i++){
        var value = parseInt($(arr[i]).val())
        arrToReturn.push(value)
      }
      return arrToReturn
    }

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

    var makeObjsToPost = function(arr){
      var objsToPost = []
      for (var i=0;i<arr.length;i++){
        objsToPost.push({
          company_id: $scope.companyId,
          attribute_id: arr[i],
          employee_types: angular.toJson(employees)
        })
      }
      postResponses(objsToPost)
    }

    var employees = getSelectedVals($('input[type=checkbox]:checked'))
    var attributes = getSelectedVals($('option:selected'))
    makeObjsToPost(attributes)

  }

}]);