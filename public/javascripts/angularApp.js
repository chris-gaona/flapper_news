(function() {
  'use strict';

  angular.module('flapperNews', [
    'ui.router',
    'ui.bootstrap'
  ])

  //this is considered the parent state
  .config([
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
  ])


  .controller('navCtrl', ['$scope', 'authService', function($scope, authService) {
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.currentUser = authService.currentUser;
    $scope.logOut = authService.logOut;
  }]);

  // TODO: query usernames to make sure user who registers has unique username

})();
