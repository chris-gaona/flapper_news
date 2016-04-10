(function() {
  'use strict';

  //--------------------------------------
  //MAIN CALLBACK FUNCTIONS
  //--------------------------------------
  function config($stateProvider) {
    $stateProvider
    .state('posts', {
      parent: 'root',
      url: '/posts/{id}',
      views: {
        'container@': {
          templateUrl: '/partials/post',
          controller: 'postsCtrl',
          controllerAs: 'post'
        }
      },
      resolve: {
        post: ['$stateParams', 'postService', function($stateParams, postService) {
          return postService.get($stateParams.id);
        }]
      }
    });
  } //config FUNCTIONS

  function postsCtrl(postService, post, authService, userService) {
    var vm = this;

    //used to get individual posts
    if (post.length === 0) {
      vm.log = 'Sorry no comments yet!';
    }

    vm.post = post;

    vm.isLoggedIn = authService.isLoggedIn;

    vm.addComment = function() {
      if (vm.body === '') {
        return;
      }

      postService.addComment(post._id, {
        body: vm.body,
        author: 'user',
      }).success(function(comment) {
        vm.post.comments.push(comment);
      });
      vm.body = '';
    };

    vm.deleteComment = function(comment) {
      postService.deleteUserComment(post, comment);
      vm.post.comments.splice(vm.post.comments.indexOf(comment), 1);
    }

    vm.incrementUpvotes = function(comment) {
      postService.upvoteComment(post, comment);
    };

    vm.getUpvotedColor = function(comment) {
      if (isUpvotedByCurrentUser(comment)) {
        return 'text-primary';
      } else {
        return 'text-muted';
      }
    };

    function isUpvotedByCurrentUser(comment) {
      return comment.usersWhoUpvoted.indexOf(authService.currentUserId()) != -1;
    };

    //checks if user is owner of user personal page visited
    vm.isCorrectUser = function(comment) {
      if (authService.currentUser() != comment.author) {
        return false;
      } else {
        return true;
      }
    }
  } //postsCtrl callback

  //--------------------------------------
  //ANGULAR
  //--------------------------------------
  angular.module('flapperNews')

  .config(['$stateProvider', config])

  .controller('postsCtrl', ['postService', 'post', 'authService', 'userService', postsCtrl]);

})();
