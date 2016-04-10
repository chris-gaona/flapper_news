(function() {
  'use strict';

  angular.module('flapperNews')

  .config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
      .state('home', {
        parent: 'root',
        url: '/home',
        views: {
          'container@': {
            templateUrl: '/partials/home',
            controller: 'mainCtrl',
            controllerAs: 'main'
          }
        },
        resolve: {
          postPromise: ['postService', function(postService){
            return postService.getAll();
          }]
        }
      });
    }
  ])


  .controller('mainCtrl', ['$scope', 'postService', 'authService', function($scope, postService, authService) {

    if (postService.message === '') {
      $scope.addMessage = false;
    } else {
      $scope.addMessage = true;
      $scope.message = postService.message;
    }

    //used to display all posts
    $scope.posts = postService.posts;

    $scope.isLoggedIn = authService.isLoggedIn;

    $scope.addPost = function() {
      if (!$scope.title || $scope.title === '') {
        return;
      }

      postService.create({
        title: $scope.title,
        link: $scope.link
      });
      $scope.title = '';
      $scope.link = '';
      $scope.addMessage = false;
    };

    // $scope.deletePost = function(post) {
    //   postService.deletePost(post);
    // };

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
