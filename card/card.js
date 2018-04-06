'use strict';

angular.module('catApp.card', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/card/:cardID', {
    templateUrl: 'card/card.html',
    controller: 'CardCtrl'
  });
}])
