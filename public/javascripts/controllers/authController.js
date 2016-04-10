(function() {
  'use strict';

  //--------------------------------------
  //MAIN CALLBACK FUNCTIONS
  //--------------------------------------
  function config($stateProvider) {
    $stateProvider
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
          controllerAs: 'auth'
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
          controllerAs: 'auth'
        }
      },
      onEnter: ['$state', 'authService', function($state, authService) {
        if (authService.isLoggedIn()) {
          $state.go('home');
        }
      }]
    });
  } //config callback

  function AuthCtrl($state, authService) {
    var vm = this;

    vm.register = function() {
      authService.register(vm.user).error(function(error) {
        vm.error = error;
      }).then(function() {
        $state.go('home');
      });
    };

    vm.logIn = function() {
      authService.logIn(vm.user).error(function(error) {
        vm.error = error;
      }).then(function() {
        $state.go('home');
      });
    };
  } //auth callback

  //--------------------------------------
  //ANGULAR
  //--------------------------------------
  angular.module('flapperNews')

  .config(['$stateProvider',config])

  .controller('AuthCtrl', ['$state', 'authService', AuthCtrl]);

})();
