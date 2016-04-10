(function() {
  'use strict';

  angular.module('flapperNews')

  .config([
    '$stateProvider',
    function($stateProvider) {
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
    }
  ])

  .controller('usersCtrl', ['postService', 'authService', 'userService', 'user', function(postService, authService, userService, user) {
    this.user = user;

    //checks if user is owner of user personal page visited
    if (authService.currentUserId() != this.user._id) {
      this.isCorrectUser = false;
    } else {
      this.isCorrectUser = true;
    }

    this.deletePost = function(post) {
      userService.deleteUserPost(post);
      this.user.userPosts.splice(this.user.userPosts.indexOf(post), 1);
    };

    this.incrementUpvotes = function(post) {
      postService.upvote(post);
    };

    this.getUpvotedColor = function(post) {
      if (isUpvotedByCurrentUser(post)) {
        return 'text-primary';
      } else {
        return 'text-muted';
      }
    };

    function isUpvotedByCurrentUser(post) {
      return post.usersWhoUpvoted.indexOf(authService.currentUserId()) != -1;
    };

  }]);

})();
