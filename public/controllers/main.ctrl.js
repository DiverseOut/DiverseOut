ourApp.controller("MainController", ['$scope', '$http', '$route','$cookies', '$location', function($scope, $http, $route, $cookies, $location){

    console.log("COOKIE: "+$cookies.user_id)

    $scope.loggedInUser = $cookies.user_id

    $scope.logout = function(){
        delete $cookies.user_id
        $location.path('/')
    }

}]);
