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
            controller: 'usersCtrl'
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

  .controller('usersCtrl', ['$scope', 'postService', 'authService', 'userService', function($scope, postService, authService, userService) {
    $scope.user = userService.userStuff.data;

    //checks if user is owner of user personal page visited
    if (authService.currentUserId() != userService.userStuff.data._id) {
      $scope.isCorrectUser = false;
    } else {
      $scope.isCorrectUser = true;
    }

    $scope.deletePost = function(post) {
      userService.deleteUserPost(post);
    };

    $scope.incrementUpvotes = function(post) {
      postService.upvote(post);
    };

    $scope.getUpvotedColor = function(post) {
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
