'use strict';

angular.module('catApp.feed', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feed', {
    templateUrl: 'feed/feed.html',
    controller: 'FeedCtrl'
  });
}])

.controller('FeedCtrl', ['$scope', '$http', 'sharedService', function($scope, $http, sharedService) {
  $scope.x2js = new X2JS();
  $scope.catData = [];
  $scope.catFacts = [];

  $scope.getCatImages = function(callback){
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
      sharedService.catImageData = $scope.catData;

      console.log("cat IMAGE call to API");
      callback();
    }, function(response){
      console.log("ERROR:", response);
    });
  }

  $scope.getCatFacts = function(callback){
    $http({
      method: 'GET',
      url: 'http://cors-proxy.htmldriven.com/?url=https://catfact.ninja/facts?limit=25'
    })
    .then(function(response){
      // Turn JSON String to JSON
      sharedService.catFactData = JSON.parse(response.data.body).data;

      console.log("cat fact call to API");
      callback($scope.setValues);
    }, function(response){
      console.log("ERROR:", response);
    });
  }

  $scope.setValues = function() {
    console.log("setting values");
    $scope.catData = sharedService.catImageData;
    $scope.catFacts = sharedService.catFactData;
  }

  $scope.getData = function() {
    $scope.getCatFacts($scope.getCatImages);
  }

}])
