'use strict';

// Declare app level module which depends on views, and components
angular.module('catApp', [
  'ngRoute',
  'catApp.feed',
  'catApp.card',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/feed'});
}]);
