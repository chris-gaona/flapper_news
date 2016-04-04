(function() {
  'use strict';

  var app = angular.module('flapperNews.controllers.user', ['ui.router']);

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('users', {
        parent: 'root',
        url: '/user/{username}',
        views: {
          'container@': {
            templateUrl: '/partials/user',
            controllers: 'usersCtrl'
          }
        }
      });

      $urlRouterProvider.otherwise('home');

    }
  ]);

  app.controller('usersCtrl', ['$scope', 'postService', 'authService', function($scope, postService, authService) {
    $scope.user = 'user';
  }]);

})();
