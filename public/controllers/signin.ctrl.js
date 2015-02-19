ourApp.controller("SignInController", ['$scope', '$http', '$route', '$cookies', '$location', function($scope, $http, $route, $cookies, $location){

    if ($cookies.user_id && $cookies.user_id !== "logged out") {
      console.log($cookies.user_id)
      // console.log("you were already logged in!")
      $location.path('/home')
    }

    $scope.background = "http://static.pexels.com/wp-content/uploads/2015/01/clouds-flying-high-4103.jpeg"

    var self = this;

    // FIXME: This is case sensitive. That's bad.
    $scope.signIn = function() {
          $http.get("http://nomadr-api.herokuapp.com/api/emails/" + self.email).success(function(response, body) {
              console.log("Sign In Success")
              console.log(response)
              $cookies.user_id = response._id;
              $location.path('/home')
        });
    };

}]);
