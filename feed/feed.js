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

  $scope.getCatImages = function(){
    $http({
      method: 'GET',
      url: 'http://thecatapi.com/api/images/get?format=xml&results_per_page=25'
    })
    .then(function(response){
      $scope.catData = response;
    }, function(response){
      console.log("ERROR:", response);
    });
  }
}])
