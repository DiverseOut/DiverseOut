ourApp.controller("CreateSurveyController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  $scope.companyId = parseInt($routeParams.company_id)

  $http({
    method: 'GET',
    url: API_ROOT + 'attribute_groups'
  }).success(function(response){
    $scope.companyInfo = response.company_info
    $scope.attributeGroups = response
  })

  $scope.getVals = function(){
    var attributeGroups = []
    var checkboxArr = $('.checkbox input[type=checkbox]:checked')
    for (var i=0;i<checkboxArr.length;i++){
      var value = parseInt($(checkboxArr[i]).val())
      attributeGroups.push(value)
    }
    createSurvey(attributeGroups)
  }

  $scope.selectAll = function(){
    if ($('#selectAll').prop('checked')){
      $('.checkbox input[type=checkbox]').prop('checked',true)
    } else {
      $('.checkbox input[type=checkbox]').prop('checked',false)
    }
  }

  var createSurvey = function(groups){

    var surveyDetails = {
      name:             $('input[type=text]').val(),
      company_id:       $scope.companyId,
      attribute_groups: angular.toJson(groups)
    };

    console.log(surveyDetails)

    $http({
      method: 'POST',
      url: API_ROOT + 'admins/'+$cookies.user_id+'/companies/'+$cookies.company_id+'/surveys',
      params: surveyDetails
    }).success(function(response){
      $location.path('/company_dashboard/'+$scope.companyId)
    }).error(function(data, status, headers, config){
      $scope.error = status
    })

  };

}]);
