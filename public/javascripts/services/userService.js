(function() {
  'use strict';

  angular.module('flapperNews')

  .factory('userService', ['$http', 'authService', function($http, authService) {
    var user = {
      userStuff: []
    };

    user.getUser = function(username) {
      return $http.get('/user/' + username, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).then(function(res) {
        return res.data;
        // angular.copy(data, user.userStuff)
      });
    };

    // o.get = function(id) {
    //   return $http.get('/posts/' + id).then(function(res) {
    //     return res.data;
    //   });
    // };

    user.deleteUserPost = function(post) {
      return $http.delete('/posts/' + post._id, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).then(function(response) {
        console.log(response);
        // user.userStuff.data.userPosts.splice(user.userStuff.data.userPosts.indexOf(post), 1);
      });
    };

    //can't forget this return!!!
    return user;

  }]);

})();
