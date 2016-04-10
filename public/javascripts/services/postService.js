(function() {
  'use strict';

  angular.module('flapperNews')

  .factory('postService', ['$http', 'authService', 'userService', function($http, authService, userService) {
    var o = {
      posts: []
    };

    //get all posts
    o.getAll = function() {
      return $http.get('/posts').success(function(response) {
        if (response.length > 0) {
          angular.copy(response, o.posts);
          o.message = '';
        } else {
          console.log('Sorry no posts yet!');
          o.message = 'Sorry no posts yet!';
          angular.copy(response, o.posts);
        }
      }).error(function(response, status){
            console.log('Error' + response + status);
            o.message = 'Oops, something went wrong!';
        });
    };

    //create new posts
    o.create = function(post) {
      return $http.post('/posts', post, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      })
      .success(function(data) {
        o.posts.push(data);
        console.log(o.posts);
      });
    };

    o.upvote = function(post) {
      return $http.put('/posts/' + post._id + '/upvote', null, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).success(function(upvotedPost) {
        angular.copy(upvotedPost, post);
        // post.upvotes += 1;
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

    o.deleteUserComment = function(post, comment) {
      return $http.delete('/posts/' + post._id + '/comments/' + comment._id, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).then(function(response) {
        console.log('comment deleted');
        console.log(response);
      });
    };

    o.upvoteComment = function(post, comment) {
      return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).success(function(upvotedComment) {
        angular.copy(upvotedComment, comment);
        // comment.upvotes += 1;
      });
    };

    return o;
  }]);

})();
