'use strict';

angular.module('catApp.card', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/card/:cardID', {
    templateUrl: 'card/card.html',
    controller: 'CardCtrl'
  });
}])

.controller('CardCtrl', ['$scope', '$http', '$route', '$routeParams', 'sharedService', function($scope, $http, $route, $routeParams, sharedService) {
  $scope.catCardID = $routeParams.cardID;
  $scope.catObject = sharedService.catObject;

  $scope.getCat = function(direction){
    console.log("current Cat ID:", $scope.catCardID);
    console.log("direction:", direction);
  }
}])
