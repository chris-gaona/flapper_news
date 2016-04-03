(function() {
  'use strict';

  var app = angular.module('flapperNews', [
    'flapperNews.controllers.main',
    'flapperNews.controllers.post',
    'flapperNews.services.post',
    'flapperNews.services.auth',
    'ui.router'
  ]);

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('root', {
        abstract: true,
        views: {
          'navbar': {
            templateUrl: 'partials/navbar',
            controller: 'navCtrl'
          }
        }
      })

      //onEnter gives us the ability to detect if the user is authenticated
      //before entering the state, which allows us to redirect them back to the
      //home state if they're already logged in
      .state('login', {
        parent: 'root',
        url: '/login',
        views: {
          'container@': {
            templateUrl: '/partials/login',
            controller: 'AuthCtrl',
          }
        },
        onEnter: ['$state', 'authService', function($state, authService) {
          if(authService.isLoggedIn()) {
            $state.go('home');
          }
        }]
      })

      .state('register', {
        url: '/register',
        parent: 'root',
        views: {
          'container@': {
            templateUrl: '/partials/register',
            controller: 'AuthCtrl',
          }
        },
        onEnter: ['$state', 'authService', function($state, authService) {
          if (authService.isLoggedIn()) {
            $state.go('home');
          }
        }]
      });

      $urlRouterProvider.otherwise('home');
  }]);












  app.controller('AuthCtrl', ['$scope', '$state', 'authService', function($scope, $state, authService) {
    $scope.user = {};

    $scope.register = function() {
      authService.register($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('home');
      });
    };

    $scope.logIn = function() {
      authService.logIn($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('home');
      });
    };
  }]);

  app.controller('navCtrl', ['$scope', 'authService', function($scope, authService) {
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.currentUser = authService.currentUser;
    $scope.logOut = authService.logOut;
  }]);

})();
