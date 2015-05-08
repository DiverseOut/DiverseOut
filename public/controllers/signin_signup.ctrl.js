ourApp.controller("SignInSignUpController", ['$scope', '$http', '$route', '$cookies', '$location', function($scope, $http, $route, $cookies, $location){

    if ($cookies.user_id && $cookies.user_id !== "logged out") {
      alert("You are already logged in.")
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
          url: API_ROOT + '/admins/authenticate',
          params: credentials,
        }).success(function(response, body){
            if (response.errors){
              $scope.error = response.errors
            } else {
              $cookies.user_id = response.id;
              if (typeof response.company_id == "number") {
                $cookies.company_id = response.company_id
                $location.path('/company_dashboard/'+response.company_id)
                window.location.reload()
              } else {
                $location.path('/create_company')
                window.location.reload()
              }
            };
        }).error(function(data, status, headers, config){
          $scope.error = response.errors
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
       $http({
          method: 'POST',
          url: API_ROOT + '/admins',
          params: credentials
       }).success(function(response, body){
          if (response.errors){
            $scope.error = response.errors
          } else {
            $cookies.user_id = response.id;
            if (typeof response.company_id == "number") {
              $cookies.company_id = response.company_id
              $location.path('/company_dashboard/'+response.company_id)
              window.location.reload()
            } else {
              $location.path('/create_company')
              window.location.reload()
            }
          };
        }).error(function(data, status, headers, config){
          $scope.error = response.errors
        })
    };

}]);
