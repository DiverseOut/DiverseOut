ourApp.controller("SplashController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location){

    // REFACTOR THESE FIRST 2 HTTP CALLS SO DONT HAVE TO CALL THEM EACH TIME TO GET WELCOME GREETING

    $scope.loggedInUser = $cookies.user_id
    $scope.companyId = $cookies.company_id

    $http({
      method: 'GET',
      url: API_ROOT + 'admins/'+$cookies.user_id
    }).success(function(response){
      console.log(response)
      $scope.user = response
    })

    $http({
      method: 'GET',
      url: API_ROOT + 'companies/'+$cookies.company_id
    }).success(function(response){
      console.log(response)
      $scope.companyInfo = response.company
    })

// CHANGE TO HEROKU URL ONCE API IS LIVE:
  $http.get(API_ROOT).success(function(response){
    $scope.companies = response
  })

  $scope.getCompanyInfo = function(companyId) {
    console.log(companyId)
    $http({
      method: "GET",
      url: API_ROOT + "/companies/"+companyId+"/responses"
    }).success(function(response){
      console.log(response)
      $scope.companyInfo = response.company_info
      $scope.companyStats = response.response_stats
    })
  }

  // $scope.getPieDataset = function(response_stats){

  // }

  $scope.upVote = function(companyId){
    $http({
      method: "POST",
      url: API_ROOT + "/companies/" + companyId + "/upvote"
    }).success(function(response){
      // update votes that show below buttons. Also, check rake routes for upvote/downvote
      console.log(response)
    })
  }

  $scope.downVote = function(companyId){
    $http({
      method: "POST",
      url: API_ROOT + "/companies/" + companyId + "/downvote"
    }).success(function(response){
      // update votes that show below buttons. Also, check rake routes for upvote/downvote
      console.log(response)
    })
  };

}]);
