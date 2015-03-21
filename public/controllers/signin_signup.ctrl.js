ourApp.controller("SignInSignUpController", ['$scope', '$http', '$route', '$cookies', '$location', function($scope, $http, $route, $cookies, $location){

    console.log("hey")

    if ($cookies.user_id && $cookies.user_id !== "logged out") {
      console.log($cookies.user_id)
      // console.log("you were already logged in!")
      $location.path('/')
    }

    var generatePasswordHash = function(enteredPassword) {
      var hashedPassword = new jsSHA(enteredPassword, 'TEXT');
      return hashedPassword.getHash('SHA-1', 'HEX');
    };

    $scope.signIn = function(){
        var credentials = {
          email:    $('input[name=email]').val(),
          password: generatePasswordHash($('input[name=password]').val())
        }
        $http({
          method: 'GET',
          url: 'http://localhost:9393/admins/authenticate',
          params: credentials,
        }).success(function(response, body){
            console.log(response)
            if (response.errors){
              console.log(response.errors)
              $scope.error = response.errors
            } else {
              $cookies.user_id = response.id;
              if (typeof response.company_id == "number") {
                console.log("dash")
                $cookies.company_id = response.company_id
                $location.path('/company_dashboard/'+response.company_id)
              } else {
                console.log("create")
                $location.path('/create_company')
              }
            };

        }).error(function(data, status, headers, config){
          console.log(data,status)
        })
    };

    $scope.signUp = function(){
        var credentials = {
          first_name: $('input[name=first_name]').val(),
          last_name:  $('input[name=last_name]').val(),
          job_title:  $('input[name=job_title]').val(),
          email:      $('input[name=email]').val(),
          password_hash:   generatePasswordHash($('input[name=password]').val()),
        }
        console.log(credentials)
       $http({
          method: 'POST',
          url: 'http://localhost:9393/admins',
          params: credentials
       }).success(function(response, body){
          console.log(response)
            if (response.errors){
              console.log(response.errors)
              $scope.error = response.errors
            } else {
              $cookies.user_id = response.id;
              if (typeof response.company_id == "number") {
                console.log("dash")
                $cookies.company_id = response.company_id
                $location.path('/company_dashboard/'+response.company_id)
              } else {
                console.log("create")
                $location.path('/create_company')
              }
            };
        }).error(function(data, status, headers, config){
          console.log(data,status)
        })
    };

}]);