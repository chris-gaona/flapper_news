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
      }).then(function(data) {
        // return res.data;
        angular.copy(data, user.userStuff)
      });
    };

    user.deleteUserPost = function(post) {
      return $http.delete('/posts/' + post._id, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).then(function() {
        user.userStuff.data.userPosts.splice(user.userStuff.data.userPosts.indexOf(post), 1);
        // angular.copy(data, post);
      });
    };

    // user.deletePost = function(post) {
    //   console.log('yes sir');
    //   return $http.delete('/posts/' + post._id, {
    //     headers: {Authorization: 'Bearer '+authService.getToken()}
    //   }).then(function(data) {
    //     // angular.copy(data, post);
    //   });
    // };

    //can't forget this return!!!
    return user;

  }]);

})();
