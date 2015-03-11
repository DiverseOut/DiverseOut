ourApp.controller("SignUpController", ['$scope', '$http', '$route', '$location', '$cookies', function($scope, $http, $route, $location, $cookies){

    if ($cookies.user_id && $cookies.user_id !== "logged out") {
        console.log($cookies.user_id)
        // console.log("you were already logged in!")
        $location.path('/home')
    }

    var self = this;
    $scope.signUp = function() {
        $http.post("", {
            name:           self.user.name,
            email:          self.user.email,
        }).success(function(response, body) {
            console.log("Success!")
            $cookies.user_id = response.user._id;
            $location.path('/home')
        });
    };
}]);
