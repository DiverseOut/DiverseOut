ourApp.controller("CompanyDashboardController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

    $scope.companyId = $routeParams.company_id

    $scope.readableDate = function(dateArr){
      return (new Date(Date.parse(dateArr)).toDateString())
      // var newDates = []
      // for (var i=0;i<dateArr.length;i++){
      //   newDates.push(new Date(Date.parse(dateArr[i].created_at)).toDateString())
      // }
      // newDates
      // console.log(newDates)
    }

    $http({
      method: 'GET',
      url: 'http://localhost:9393/companies/'+$scope.companyId,
    }).success(function(response){
      console.log(response)
      $scope.company = response.company
      $scope.surveys = response.surveys
    })

    // new Date(Date.parse()).toDateString()

}]);