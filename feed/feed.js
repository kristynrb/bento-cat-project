'use strict';

angular.module('catApp.feed', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feed', {
    templateUrl: 'feed/feed.html',
    controller: 'FeedCtrl'
  });
}])

.controller('FeedCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.catData = [];
  $scope.x2js = new X2JS();
  $scope.catFacts = [];

  $scope.getCatImages = function(){
    $http({
      method: 'GET',
      url: 'http://thecatapi.com/api/images/get?format=xml&results_per_page=25'
    })
    .then(function(response){
      // Turn XML to JSON
      $scope.jsonObj = $scope.x2js.xml_str2json( response.data );
      $scope.catData = $scope.jsonObj.response.data.images.image;
      // Create an ID to reference a fact
      let index = 0;
      $scope.catData.forEach(function(cat){
        cat.factID = index;
        index += 1;
      })
    }, function(response){
      console.log("ERROR:", response);
    });
  }

  $scope.getCatFacts = function(){
    $http({
      method: 'GET',
      url: 'http://cors-proxy.htmldriven.com/?url=https://catfact.ninja/facts?limit=25'
    })
    .then(function(response){
      // Turn JSON String to JSON
      $scope.catFacts = JSON.parse(response.data.body).data;
    }, function(response){
      console.log("ERROR:", response);
    });
  }
}])
