ourApp.controller("SignUpController", ['$scope', '$http', '$route', '$location', '$cookies', function($scope, $http, $route, $location, $cookies){

    if ($cookies.user_id && $cookies.user_id !== "logged out") {
        console.log($cookies.user_id)
        // console.log("you were already logged in!")
        $location.path('/home')
    }

  // console.log("Controller")

    $scope.background = "http://static.pexels.com/wp-content/uploads/2015/01/clouds-flying-high-4103.jpeg"

    var self = this;

    $scope.signUp = function() {
        $http.post("http://nomadr-api.herokuapp.com/api/users/", {
            name:           self.user.name,
            email:          self.user.email,
            city:           self.user.city,
            departureDate:  self.user.departureDate,
        }).success(function(response, body) {
            console.log("Success!")
            $cookies.user_id = response.user._id;

            $location.path('/home')
        });
    };
}]);
