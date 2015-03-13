ourApp.controller("SignInSignUpController", ['$scope', '$http', '$route', '$cookies', '$location', function($scope, $http, $route, $cookies, $location){

    if ($cookies.user_id && $cookies.user_id !== "logged out") {
      console.log($cookies.user_id)
      // console.log("you were already logged in!")
      $location.path('/')
    }

    $scope.signIn = function() {
        var credentials = {
          email:    this.email,
          password: this.password
        }
        $http.get("http://localhost:9393/admins", credentials).success(function(response, body){
            console.log("Sign In Success")
            // console.log(response)
            $cookies.user_id = response.id;
            $location.path('/company_dashboard')
        });
    };

    $scope.signUp = function() {
        var credentials = $.param({
          first_name: this.first_name,
          last_name:  this.last_name,
          job_title:  this.job_title,
          email:      this.email,
          password:   this.password
        })
       $http({
          method: 'POST',
          url: 'http://localhost:9393/admins/',
          data: credentials,
          headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8' }
       }).success(function(response, body){
            console.log("Success!")
            $cookies.user_id = response.id;
            $location.path('/company_dashboard')
        })
        // $http.post("http://localhost:9393/admins/", credentials).success(function(response, body){
        //     console.log(response)
        //     console.log("Success!")
        //     $cookies.user_id = response.user._id;
        //     $location.path('/company_dashboard')
        // });
    };

}]);