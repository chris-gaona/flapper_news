(function() {
  'use strict';

  angular.module('flapperNews')

  .config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
      .state('posts', {
        parent: 'root',
        url: '/posts/{id}',
        views: {
          'container@': {
            templateUrl: '/partials/post',
            controller: 'postsCtrl'
          }
        },
        resolve: {
          post: ['$stateParams', 'postService', function($stateParams, postService) {
            return postService.get($stateParams.id);
          }]
        }
      });
    }
  ])


  .controller('postsCtrl', ['$scope', 'postService', 'post', 'authService', function($scope, postService, post, authService) {
    //used to get individual posts
    $scope.post = post;

    $scope.isLoggedIn = authService.isLoggedIn;

    $scope.addComment = function() {
      if ($scope.body === '') {
        return;
      }

      postService.addComment(post._id, {
        body: $scope.body,
        author: 'user',
      }).success(function(comment) {
        $scope.post.comments.push(comment);
      });
      $scope.body = '';
    };

    $scope.incrementUpvotes = function(comment) {
      postService.upvoteComment(post, comment);
    };

    $scope.getUpvotedColor = function(comment) {
      if (isUpvotedByCurrentUser(comment)) {
        return 'text-primary';
      } else {
        return 'text-muted';
      }
    };

    function isUpvotedByCurrentUser(comment) {
      return comment.usersWhoUpvoted.indexOf(authService.currentUserId()) != -1;
    };

  }]);

})();
