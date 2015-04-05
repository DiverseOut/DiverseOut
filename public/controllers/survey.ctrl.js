ourApp.controller("ShowSurveyController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){


  $scope.companyId = parseInt($routeParams.company_id)
  $scope.surveyId = parseInt($routeParams.survey_id)

  // TODO: This uses $http and later $.ajax, which is inconsistent
  // Use only one ajax method!
  // VC
  $http({
    method: 'GET',
    url: 'http://localhost:3000/companies/'+$scope.companyId+'/surveys/'+$scope.surveyId,
  }).success(function(response){

    // surveyInfo is used to populate DOM; see partials/survey.html
    $scope.surveyInfo = response

    // following function is called on form submit
    $scope.getVals = function(){
      submitForm.makeObjsToPost().then(submitForm.postResponses());
    }
  })

// our iife! so proud.
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

    // declaring (but not defining) employees and attributes
    // such that they can be modified later
    var employees
    var attributes

    return {

      // TODO: the following function is ugly af
      postResponses: function(){
        var postStatusArr = []

        function httpPost(parameters){
          // debugger
          jQuery.ajax({
            type: 'POST',
            url: 'http://localhost:3000/companies/'+$scope.companyId+'/responses',
            data: parameters
          }).done(function(response){
            console.log("Post success!")
            postStatusArr.push(response)
          }).fail(function(error) {
            // TODO: better error handling
            console.log("Post fail!")
            postStatusArr.push(error)
          })
        }

        function loopPosts(){
          for (i=0;i<attributes.length;i++){
            httpPost(attributes[i])
          }
        }

        // makes a separate $.ajax call for each field in the form
        loopPosts()

        // TODO: Add logic here to only redirect if all posts are successful
        $location.path('/company_stats/'+$scope.companyId)
      },

      makeObjsToPost: function(){
        var deferred = new $.Deferred()
        var objsToPost = [];

        // these were declared within the iife's closure earlier
        // but not defined. Now that the DOM is loaded we can define them
        employees = getValuesOfSelectedAttributes($('.employee-type input[type=checkbox]:checked'));
        attributes = getValuesOfSelectedAttributes($('.list-wrapper option:selected'));

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
  }();
}]);
