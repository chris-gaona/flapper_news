(function() {
  'use strict';

  //--------------------------------------
  //MAIN CALLBACK FUNCTIONS
  //--------------------------------------
  function userService($http, authService) {
    var userService = {
      userStuff: []
    };

    userService.getUser = function(username) {
      return $http.get('/user/' + username, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).then(function(res) {
        return res.data;
        // angular.copy(data, user.userStuff)
      });
    };

    userService.deleteUserPost = function(post) {
      return $http.delete('/posts/' + post._id, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).then(function(response) {
        console.log(response);
        // user.userStuff.data.userPosts.splice(user.userStuff.data.userPosts.indexOf(post), 1);
      });
    };

    //can't forget this return!!!
    return userService;
  }

  //--------------------------------------
  //ANGULAR
  //--------------------------------------
  angular.module('flapperNews')

  .factory('userService', ['$http', 'authService', userService]);

})();
