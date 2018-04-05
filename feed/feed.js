'use strict';

angular.module('catApp.feed', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feed', {
    templateUrl: 'feed/feed.html',
    controller: 'FeedCtrl'
  });
}])

.controller('FeedCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.catData=[];
  $scope.x2js = new X2JS();

  $scope.getCatImages = function(){
    $http({
      method: 'GET',
      url: 'http://thecatapi.com/api/images/get?format=xml&results_per_page=25'
    })
    .then(function(response){
      // Turn XML to JSON
      $scope.jsonObj = $scope.x2js.xml_str2json( response.data );
      $scope.catData = $scope.jsonObj.response.data.images.image;
    }, function(response){
      console.log("ERROR:", response);
    });
  }
}])
