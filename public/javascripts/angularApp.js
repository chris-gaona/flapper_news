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
            controller: 'navCtrl',
            controllerAs: 'nav'
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


  .controller('navCtrl', ['authService', function(authService) {
    var vm = this;
    vm.isLoggedIn = authService.isLoggedIn;
    vm.currentUser = authService.currentUser;
    vm.logOut = authService.logOut;

  }]);

  // TODO: query usernames to make sure user who registers has unique username
  // TODO: make upvote a toggle

})();
