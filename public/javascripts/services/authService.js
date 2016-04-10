(function() {
  'use strict';

  //--------------------------------------
  //MAIN CALLBACK FUNCTIONS
  //--------------------------------------
  function authService($http, $window) {
    var authService = {};

    //save token in local storage
    authService.saveToken = function(token) {
      $window.localStorage['flapper-news-token'] = token;
    };

    //get token from local storage
    authService.getToken = function(token) {
      return $window.localStorage['flapper-news-token'];
    };

    //return a boolean value for if the user is logged in
    authService.isLoggedIn = function() {
      var token = authService.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    //function currentUser() that returns the username of the user that's logged in
    authService.currentUser = function() {
      if(authService.isLoggedIn()){
        var token = authService.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    };

    authService.currentUserId = function() {
      if (authService.isLoggedIn()) {
        var token = authService.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload._id;
      }
    };

    //register function that posts a user to our /register route and saves the token returned
    authService.register = function(user) {
      return $http.post('/register', user).success(function(data){
        authService.saveToken(data.token);
      });
    };

    // login function that posts a user to our /login route and saves the token returned
    authService.logIn = function(user) {
      return $http.post('/login', user).success(function(data){
        authService.saveToken(data.token);
      });
    };

    //logout function that removes the user's token from localStorage, logging the user out.
    authService.logOut = function() {
      $window.localStorage.removeItem('flapper-news-token');
    };

    return authService;
  }

  //--------------------------------------
  //ANGULAR
  //--------------------------------------
  angular.module('flapperNews')

  //create initial auth factory. We'll need to inject $http for interfacing with our server, and $window for interfacing with localStorage
  .factory('authService', ['$http', '$window', authService]);

})();
