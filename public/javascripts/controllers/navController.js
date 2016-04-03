(function() {
  'use strict';

  var app = angular.module('flapperNews.controllers.nav', ['ui.router']);

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
      });

      $urlRouterProvider.otherwise('home');
      
    }
  ]);


  app.controller('navCtrl', ['$scope', 'authService', function($scope, authService) {
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.currentUser = authService.currentUser;
    $scope.logOut = authService.logOut;
  }]);

})();
