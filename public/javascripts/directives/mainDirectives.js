(function() {
  'use strict';

  var app = angular.module('flapperNews');

  //adds autofocus to the login and register input fields
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
