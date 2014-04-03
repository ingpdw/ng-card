'use strict';

angular.module('dimmed', [])
.directive('dimmed', function () {
    return {
      template: '<div style="width:100%;height:100%;background-color:#000; ng-show="disbleDimmed"></div>',
      restrict: 'CE',
      replace: true,
      link: function(scope, element, attrs) {
        
      }
    }
  });