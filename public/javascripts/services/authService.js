(function() {
  'use strict';

  angular.module('flapperNews')

  //create initial auth factory. We'll need to inject $http for interfacing with our server, and $window for interfacing with localStorage
  .factory('authService', ['$http', '$window', function($http, $window) {
    var auth = {};

    //save token in local storage
    auth.saveToken = function(token) {
      $window.localStorage['flapper-news-token'] = token;
    };

    //get token from local storage
    auth.getToken = function(token) {
      return $window.localStorage['flapper-news-token'];
    };

    //return a boolean value for if the user is logged in
    auth.isLoggedIn = function(){
      var token = auth.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    //function currentUser() that returns the username of the user that's logged in
    auth.currentUser = function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    };

    auth.currentUserId = function() {
      if (auth.isLoggedIn()) {
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload._id;
      }
    };

    //register function that posts a user to our /register route and saves the token returned
    auth.register = function(user){
      return $http.post('/register', user).success(function(data){
        auth.saveToken(data.token);
      });
    };

    // login function that posts a user to our /login route and saves the token returned
    auth.logIn = function(user){
      return $http.post('/login', user).success(function(data){
        auth.saveToken(data.token);
      });
    };

    //logout function that removes the user's token from localStorage, logging the user out.
    auth.logOut = function(){
      $window.localStorage.removeItem('flapper-news-token');
    };

    return auth;
  }]);

})();
