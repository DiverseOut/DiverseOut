ourApp.controller("CompanyDashboardController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location){

   $scope.companyExists = true // if Admin record in DB has company associated with it

  // GET ADMIN INFO:
  $http.get("http://localhost:9393/admins/", {id: $cookies.user_id}).success(function(response){
    console.log(response)
  })



  // POST NEW COMPANY WITH & UPDATE ADMIN'S COMPANY_ID IN SAME FUNCTION (1 FUNCTION WITH 2 POSTS)

  // GET COMPANY INFO (TO BE ABLE TO EDIT)

  // PUT (UPDATE) COMPANY INFO

}]);
