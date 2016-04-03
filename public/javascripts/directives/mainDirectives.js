(function() {
  'use strict';

  var app = angular.module('flapperNews');

  app.directive('autoFocus', ['$timeout', function($timeout) {
    return {
      restrict: 'AE',
      link: function(scope, elem, attrs) {
        $timeout(function() {
          elem[0].focus();
        }, 0);
      }
    };
  }]);

})();
