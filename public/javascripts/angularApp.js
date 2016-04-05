(function() {
  'use strict';

  var app = angular.module('flapperNews', [
    'flapperNews.controllers.main',
    'flapperNews.controllers.post',
    'flapperNews.controllers.auth',
    'flapperNews.controllers.user',
    'flapperNews.services.post',
    'flapperNews.services.auth',
    'flapperNews.services.user',
    'ui.router'
  ]);

  //this is considered the parent state
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
          },
          'footer': {
            templateUrl: 'partials/footer',
            controller: ''
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

  // TODO: add post delete functionality

})();
