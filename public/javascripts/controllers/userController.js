(function() {
  'use strict';

  //--------------------------------------
  //MAIN CALLBACK FUNCTIONS
  //--------------------------------------
  function config($stateProvider) {
    $stateProvider
    .state('users', {
      parent: 'root',
      url: '/user/{username}',
      views: {
        'container@': {
          templateUrl: '/partials/user',
          controller: 'usersCtrl',
          controllerAs: 'user'
        }
      },
      resolve: {
        user: ['$stateParams', 'userService', function($stateParams, userService) {
          return userService.getUser($stateParams.username);
        }]
      }
    });
  } //config callback

  function usersCtrl(postService, authService, userService, user) {
    var vm = this;

    vm.user = user;

    //checks if user is owner of user personal page visited
    if (authService.currentUserId() != vm.user._id) {
      vm.isCorrectUser = false;
    } else {
      vm.isCorrectUser = true;
    }

    vm.deletePost = function(post) {
      userService.deleteUserPost(post);
      vm.user.userPosts.splice(vm.user.userPosts.indexOf(post), 1);
    };

    vm.incrementUpvotes = function(post) {
      postService.upvote(post);
    };

    vm.getUpvotedColor = function(post) {
      if (isUpvotedByCurrentUser(post)) {
        return 'text-primary';
      } else {
        return 'text-muted';
      }
    };

    function isUpvotedByCurrentUser(post) {
      return post.usersWhoUpvoted.indexOf(authService.currentUserId()) != -1;
    };
  } //usersCtrl callback

  //--------------------------------------
  //ANGULAR
  //--------------------------------------
  angular.module('flapperNews')

  .config(['$stateProvider', config])

  .controller('usersCtrl', ['postService', 'authService', 'userService', 'user', usersCtrl]);

})();
