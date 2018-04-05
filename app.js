'use strict';

angular.module('catApp', [
  'ngRoute',
  'catApp.feed',
  'catApp.card',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/feed'});
}]);
