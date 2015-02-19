ourApp.controller("MainController", ['$scope', '$http', '$route','$cookies', '$location', function($scope, $http, $route, $cookies, $location){

    console.log("COOKIE: "+$cookies.user_id)

    $scope.loggedInUser = $cookies.user_id
    $scope.bgImg
// set this http get to user:

// Get current user
    $http.get("http://nomadr-api.herokuapp.com/api/users/"+$scope.loggedInUser).success(function(response){

        $scope.currentUser = response

        $scope.leaveDate = moment(new Date($scope.currentUser.departureDate)).format("MMMM Do, YYYY")
        $scope.fromNow = moment(new Date($scope.currentUser.departureDate)).fromNow()

        //Get events
        $http.get('http://nomadr-api.herokuapp.com/api/events/'+$scope.loggedInUser).success(function(response){
            console.log(response.events)
            $scope.eventList = response.events
         })

        if (moment($scope.currentUser.departureDate).diff(moment(new Date()), 'months') <= 2) {
            $scope.withinTwoMonths = true
        } else {
            $scope.withinTwoMonths = false
        }

        // Get weather
        $http.get('http://nomadr-api.herokuapp.com/api/weather/'+$scope.loggedInUser).success(function(response){
            $scope.weather = response.weather
         })

        //Get PANARAMIO photo:
        $http.get('http://nomadr-api.herokuapp.com/api/panaramio/'+$scope.loggedInUser).success(function(response){
            var maxNum          = response.photos.length
            var randNum         = (Math.floor(Math.random()*(maxNum - 0) + 0))
            $scope.bgImg        = response.photos[randNum].photo_url
            $scope.titleImg     = response.photos[randNum].photo_title
            $scope.ownerImg     = response.photos[randNum].owner_name
            $scope.imgOwnerUrl  = response.photos[randNum].owner_url
         })

        // Get Wiki Info
        $http.get('http://nomadr-api.herokuapp.com/api/wiki/'+$scope.loggedInUser).success(function(response){
            $scope.wiki_data = response.wiki_content
            // console.log(response.wiki_content)
        }).error(function() {
            console.log("wiki data failed")
        })

        //Get time
        $http.get('http://nomadr-api.herokuapp.com/api/time/'+$scope.loggedInUser).success(function(response){
                $scope.time = moment(response.time, "hh:mm").format("ddd, h:mm A")

                setInterval(function(){
                    $http.get('http://nomadr-api.herokuapp.com/api/time/'+$scope.loggedInUser).success(function(response){
                        $scope.time = moment(response.time, "hh:mm").format("ddd, h:mm A")
                    })
                },30000)

            })

    }).error(function(){
        $scope.quote =  "Request Failed!"
    })

    $scope.farenheit = function(kelvin) {
        var num = 1.8 * (kelvin - 273) + 32
        // console.log("farenheit is being called")
        return num.toFixed()
    }


    $scope.logout = function(){
        delete $cookies.user_id
        $location.path('/')
    }

}]);
