'use strict';
angular.module('catApp.sharedService', ['ngRoute'])

.service('sharedService', function() {
  this.catImageData = [];
  this.catFactData = [];
  this.singleCatID;
  this.catObject = {};
  var self = this;

  this.getLastWord = function(fact) {
    let factArray = fact.split(" ");
    return factArray.pop();
  }

  this.createCatObject = function(){
    let index = 0;
    this.catImageData.forEach(function(img) {
      self.catObject[index] = {url: img.url, fact: self.catFactData[index].fact, factLastWord: self.getLastWord(self.catFactData[index].fact), factID: index, favorite: false}
      index += 1
    })
  }
})
