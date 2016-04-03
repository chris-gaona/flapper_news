(function() {
  'use strict';

  var app = angular.module('flapperNews', [
    'flapperNews.services.post',
    'flapperNews.services.auth',
    'ui.router'
  ]);

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('home', {
        parent: 'root',
        url: '/home',
        views: {
          'container@': {
            templateUrl: '/partials/home',
            controller: 'mainCtrl',
          }
        },
        resolve: {
          postPromise: ['postService', function(postService){
            return postService.getAll();
          }]
        }
      })
      .state('root', {
        abstract: true,
        views: {
          'navbar': {
            templateUrl: 'partials/navbar',
            controller: 'navCtrl'
          }
        }
      })
      .state('posts', {
        parent: 'root',
        url: '/posts/{id}',
        views: {
          'container@': {
            templateUrl: '/partials/post',
            controller: 'postsCtrl',
          }
        },
        resolve: {
          post: ['$stateParams', 'postService', function($stateParams, postService) {
            return postService.get($stateParams.id);
          }]
        }
      })

      //onEnter gives us the ability to detect if the user is authenticated
      //before entering the state, which allows us to redirect them back to the
      //home state if they're already logged in
      .state('login', {
        parent: 'root',
        url: '/login',
        views: {
          'container@': {
            templateUrl: '/partials/login',
            controller: 'AuthCtrl',
          }
        },
        onEnter: ['$state', 'authService', function($state, authService) {
          if(authService.isLoggedIn()) {
            $state.go('home');
          }
        }]
      })

      .state('register', {
        url: '/register',
        parent: 'root',
        views: {
          'container@': {
            templateUrl: '/partials/register',
            controller: 'AuthCtrl',
          }
        },
        onEnter: ['$state', 'authService', function($state, authService) {
          if (authService.isLoggedIn()) {
            $state.go('home');
          }
        }]
      });

      $urlRouterProvider.otherwise('home');
  }]);






  app.controller('mainCtrl', ['$scope', 'postService', 'authService', function($scope, postService, authService) {

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
    };

    $scope.incrementUpvotes = function(post) {
      postService.upvote(post);
    };
  }]);

  

  app.controller('postsCtrl', ['$scope', 'postService', 'post', 'authService', function($scope, postService, post, authService) {
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

  }]);

  app.controller('AuthCtrl', ['$scope', '$state', 'authService', function($scope, $state, authService) {
    $scope.user = {};

    $scope.register = function() {
      authService.register($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('home');
      });
    };

    $scope.logIn = function() {
      authService.logIn($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('home');
      });
    };
  }]);

  app.controller('navCtrl', ['$scope', 'authService', function($scope, authService) {
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.currentUser = authService.currentUser;
    $scope.logOut = authService.logOut;
  }]);

})();
