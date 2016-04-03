(function() {
  'use strict';

  var app = angular.module('flapperNews.services.post', []);

  app.factory('postService', ['$http', 'authService', function($http, authService) {
    var o = {
      posts: []
    };

    //get all posts
    o.getAll = function() {
      return $http.get('/posts').success(function(data) {
        angular.copy(data, o.posts);
      });
    };

    //create new posts
    o.create = function(post) {
      return $http.post('/posts', post, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      })
      .success(function(data) {
        o.posts.push(data);
      });
    };

    o.upvote = function(post) {
      return $http.put('/posts/' + post._id + '/upvote', null, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).success(function(data) {
        post.upvotes += 1;
      });
    };

    o.get = function(id) {
      return $http.get('/posts/' + id).then(function(res) {
        return res.data;
      });
    };

    o.addComment = function(id, comment) {
      return $http.post('/posts/' + id + '/comments', comment, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      });
    };

    o.upvoteComment = function(post, comment) {
      return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).success(function(data) {
        comment.upvotes += 1;
      });
    };

    return o;
  }]);

})();
