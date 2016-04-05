(function() {
  'use strict';

  angular.module('flapperNews')

  .factory('userService', ['$http', 'authService', function($http, authService) {
    var user = {};

    user.getUser = function(username) {
      return $http.get('/user/' + username, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).then(function(res) {
        return res.data;
      });
    };

    //can't forget this return!!!
    return user;

  }]);

})();
