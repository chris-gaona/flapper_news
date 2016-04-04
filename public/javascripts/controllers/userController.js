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
            controller: 'usersCtrl'
          }
        },
        resolve: {
          user: ['$stateParams', 'userService', function($stateParams, userService) {
            return userService.getUser($stateParams.username);
          }]
        }
      });

      $urlRouterProvider.otherwise('home');

    }
  ]);

  app.controller('usersCtrl', ['$scope', 'postService', 'authService', 'user', function($scope, postService, authService, user) {
    $scope.user = user;
  }]);

})();
