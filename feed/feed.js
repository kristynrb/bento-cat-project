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
  $scope.catObject = {};
  $scope.sortValue = "";

  $scope.sortFeed = function (value) {
    $scope.sortValue = value;
  }

  $scope.getCatImages = function(callback){
    $http({
      method: 'GET',
      url: 'http://thecatapi.com/api/images/get?format=xml&results_per_page=25'
    })
    .then(function(response){
      // Turn XML to JSON
      $scope.jsonObj = $scope.x2js.xml_str2json( response.data );
      $scope.catData = $scope.jsonObj.response.data.images.image;
      sharedService.catImageData = $scope.catData;
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
      callback($scope.setValues);
    }, function(response){
      console.log("ERROR:", response);
    });
  }

  $scope.setValues = function() {
    sharedService.createCatObject();
    $scope.catObject = sharedService.catObject;
  }

  $scope.getData = function() {
    $scope.getCatFacts($scope.getCatImages);
  }

}])
