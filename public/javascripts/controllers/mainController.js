(function() {
  'use strict';

  // var app = angular.module('flapperNews.controllers.main', ['ui.router']);
  //
  // app.config([
  //   '$stateProvider',
  //   function($stateProvider) {
  //     $stateProvider
  //     .state('home', {
  //       parent: 'root',
  //       url: '/home',
  //       views: {
  //         'container@': {
  //           templateUrl: '/partials/home',
  //           controller: 'mainCtrl',
  //         }
  //       },
  //       resolve: {
  //         postPromise: ['posts', function(posts){
  //           return posts.getAll();
  //         }]
  //       }
  //     });
  //   }
  // ]);
  //
  // app.controller('mainCtrl', ['$scope', 'posts', 'auth', function($scope, posts, auth) {
  //
  //   //used to display all posts
  //   $scope.posts = posts.posts;
  //
  //   $scope.isLoggedIn = auth.isLoggedIn;
  //
  //   $scope.addPost = function() {
  //     if (!$scope.title || $scope.title === '') {
  //       return;
  //     }
  //
  //     posts.create({
  //       title: $scope.title,
  //       link: $scope.link
  //     });
  //     $scope.title = '';
  //     $scope.link = '';
  //   };
  //
  //   $scope.incrementUpvotes = function(post) {
  //     posts.upvote(post);
  //   };
  // }]);

})();
