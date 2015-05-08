ourApp.controller("SplashController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location){

  $scope.loggedInUser = $cookies.user_id
  $scope.companyId = $cookies.company_id

// CHANGE TO HEROKU URL ONCE API IS LIVE:
  $http.get(API_ROOT).success(function(response){
    $scope.companies = response
  })

  var readableDate = function(dateArr){
    return (new Date(Date.parse(dateArr)).toDateString())
  }

  $scope.getCompanyInfo = function(companyId) {
    console.log(companyId)
    $http({
      method: "GET",
      url: API_ROOT + "/companies/"+companyId+"/responses"
    }).success(function(response){
      console.log(response)
      $scope.companyInfo = response.company_info
      $scope.lastUpdate = readableDate(response.last_update)
      $scope.companyStats = response.response_stats
    })
  }

  $scope.upVote = function(companyId){
    $http({
      method: "POST",
      url: API_ROOT + "/companies/" + companyId + "/upvote"
    }).success(function(response){
      // ToDo: Update votes tally that shows below buttons. Also, check rake routes for upvote/downvote
      console.log(response)
    })
  }

  $scope.downVote = function(companyId){
    $http({
      method: "POST",
      url: API_ROOT + "/companies/" + companyId + "/downvote"
    }).success(function(response){
      // ToDo: Update votes tally that shows below buttons. Also, check rake routes for upvote/downvote
      console.log(response)
    })
  };

  //If all values in response array are 0, don't display that field
  $scope.posNum = function(element){
    return element.value == 0
  }

}]);
