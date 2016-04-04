(function() {
  'use strict';

  var app = angular.module('flapperNews.services.user', []);

  app.factory('userService', ['$http', 'authService', function($http, authService) {
    var user = {};

    user.getUser = function(username) {
      return $http.get('/user/' + username).then(function(res) {
        return res.data;
      });
    };

    //can't forget this return!!!
    return user;

  }]);

})();
