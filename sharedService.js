'use strict';
angular.module('catApp.sharedService', ['ngRoute'])

.service('sharedService', function() {
  this.catImageData = [];
  this.catFactData = [];
  this.singleCatID;
})
