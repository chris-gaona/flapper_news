(function() {
  'use strict';

  //--------------------------------------
  //MAIN CALLBACK FUNCTIONS
  //--------------------------------------
  function postService($http, authService, userService) {
    var postService = {
      posts: []
    };

    //get all posts
    postService.getAll = function() {
      return $http.get('/posts').success(function(response) {
        if (response.length > 0) {
          angular.copy(response, postService.posts);
          postService.message = '';
        } else {
          console.log('Sorry no posts yet!');
          postService.message = 'Sorry no posts yet!';
          angular.copy(response, postService.posts);
        }
      }).error(function(response, status){
            console.log('Error' + response + status);
            postService.message = 'Oops, something went wrong!';
        });
    };

    //create new posts
    postService.create = function(post) {
      return $http.post('/posts', post, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      })
      .success(function(data) {
        postService.posts.push(data);
      });
    };

    postService.upvote = function(post) {
      return $http.put('/posts/' + post._id + '/upvote', null, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).success(function(upvotedPost) {
        angular.copy(upvotedPost, post);
        // post.upvotes += 1;
      });
    };

    postService.get = function(id) {
      return $http.get('/posts/' + id).then(function(res) {
        return res.data;
      });
    };

    postService.addComment = function(id, comment) {
      return $http.post('/posts/' + id + '/comments', comment, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      });
    };

    postService.deleteUserComment = function(post, comment) {
      return $http.delete('/posts/' + post._id + '/comments/' + comment._id, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).then(function(response) {
        console.log('comment deleted');
        console.log(response);
      });
    };

    postService.upvoteComment = function(post, comment) {
      return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
        headers: {Authorization: 'Bearer '+authService.getToken()}
      }).success(function(upvotedComment) {
        angular.copy(upvotedComment, comment);
        // comment.upvotes += 1;
      });
    };

    return postService;
  }

  //--------------------------------------
  //ANGULAR
  //--------------------------------------
  angular.module('flapperNews')

  .factory('postService', ['$http', 'authService', 'userService', postService]);

})();
