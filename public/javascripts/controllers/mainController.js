(function() {
  'use strict';

  //--------------------------------------
  //MAIN CALLBACK FUNCTIONS
  //--------------------------------------
  function config($stateProvider) {
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
  } //config callback

  function mainCtrl(postService, authService) {
    var vm = this;

    if (postService.message === '') {
      vm.addMessage = false;
    } else {
      vm.addMessage = true;
      vm.message = postService.message;
    }

    //used to display all posts
    vm.posts = postService.posts;

    vm.isLoggedIn = authService.isLoggedIn;

    vm.addPost = function() {
      if (!vm.title || vm.title === '') {
        return;
      }

      postService.create({
        title: vm.title,
        link: vm.link
      });
      vm.title = '';
      vm.link = '';
      vm.addMessage = false;
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
  } //mainCtrl callback

  //--------------------------------------
  //ANGULAR
  //--------------------------------------
  angular.module('flapperNews')

  .config(['$stateProvider', config])

  .controller('mainCtrl', ['postService', 'authService', mainCtrl]);

})();
