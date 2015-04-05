ourApp.controller("ShowSurveyController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  $scope.companyId = parseInt($routeParams.company_id)
  $scope.surveyId = parseInt($routeParams.survey_id)

  $http({
    method: 'GET',
    url: 'http://localhost:3000/companies/'+$scope.companyId+'/surveys/'+$scope.surveyId,
  }).success(function(response){
    console.log(response)
    $scope.surveyInfo = response
    // submitForm
    $scope.getVals = function(){
      // PROMISE
      ourIife = submitForm()
      ourIife.makeObjsToPost().then(ourIife.postResponses());
      console.log("getVals yeah!")
    }
  })

// makeObjsToPost(attributes)

  // iife heck yeah
  var submitForm = function(){

    // Closure values:
    var getValuesOfSelectedAttributes = function(arr){
      for (var i=0;i<arr.length;i++){
        arr[i] = parseInt($(arr[i]).val())
      }
      return arr
    };

    var employees = getValuesOfSelectedAttributes($('input[type=checkbox]:checked'));
    var attributes = getValuesOfSelectedAttributes($('option:selected'));

    return {

      // define postResponses as $.Deferred((here's the function))
      postResponses: function(){
        var postStatusArr = []

        function httpPost(parameters){
          debugger
          jQuery.ajax({
            method: 'POST',
            url: 'http://localhost:3000/companies/'+$scope.companyId+'/responses',
            data: parameters
          }).success(function(response){
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
            // console.log(i)
          }
          // callback()
          // debugger
          // console.log(attributes)
        }

        loopPosts()
        // Add logic here to only redirect if all posts are successful
        $location.path('/company_stats/'+$scope.companyId)
      },

      makeObjsToPost: function(){
        // console.log(attributes)

        var deferred = new $.Deferred()

        var objsToPost = [];
        for (var i=0;i<attributes.length;i++){
          objsToPost.push({
            company_id: $scope.companyId,
            attribute_id: attributes[i],
            // 'employee_types': angular.toJson(employees)
            employee_types: employees //PROBLEM IS HERE DOGG
          })
        }
        console.log(objsToPost)
        attributes = objsToPost;
        // console.log(attributes)
        // debugger

        deferred.resolve();
        return deferred.promise();
      }

    }
  };


// Function too long! Refactor. Also, put secret key form in here!!



}]);
