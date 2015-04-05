ourApp.controller("ShowSurveyController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  debugger

  $scope.companyId = parseInt($routeParams.company_id)
  $scope.surveyId = parseInt($routeParams.survey_id)

  $http({
    method: 'GET',
    url: 'http://localhost:3000/companies/'+$scope.companyId+'/surveys/'+$scope.surveyId,
  }).success(function(response){
    // console.log(response)
    $scope.surveyInfo = response

    $scope.getVals = function(){

      // This isn't really an iife :(
      formPostFunctions = submitForm()

      formPostFunctions.makeObjsToPost().then(formPostFunctions.postResponses());

    }
  })


  var submitForm = function(){

    // Closure values:
    var getValuesOfSelectedAttributes = function(arr){
      // arr is not an array but a jQuery object.
      // As such, we have to create returnArray explicitly as an array
      returnArray = []

      for (var i=0;i<arr.length;i++){
        returnArray[i] = parseInt($(arr[i]).val())
      }

      return returnArray
    };

    var employees = getValuesOfSelectedAttributes($('.employee-type input[type=checkbox]:checked'));
    var attributes = getValuesOfSelectedAttributes($('.list-wrapper option:selected'));

    // return object
    return {

      postResponses: function(){
        var postStatusArr = []

        function httpPost(parameters){
          // debugger
          jQuery.ajax({
            type: 'POST',
            url: 'http://localhost:3000/companies/'+$scope.companyId+'/responses',
            data: parameters
            // processData: false
          }).done(function(response){
            console.log("Post success!")
            postStatusArr.push(response)
          }).fail(function(error) {
            // TODO: error handling
            // debugger
            console.log("Post fail!")
            postStatusArr.push(error)
          })
        }

        function loopPosts(){
          for (i=0;i<attributes.length;i++){
            httpPost(attributes[i])
          }
        }

        loopPosts()

        // TODO: Add logic here to only redirect if all posts are successful
        $location.path('/company_stats/'+$scope.companyId)
      },

      makeObjsToPost: function(){
        var deferred = new $.Deferred()
        var objsToPost = [];

        for (var i=0;i<attributes.length;i++){
          objsToPost.push({
            company_id: $scope.companyId,
            attribute_id: attributes[i],
            employee_types: employees
          })
        }

        attributes = objsToPost;

        deferred.resolve();
        return deferred.promise();
      }
    }
  };

}]);
