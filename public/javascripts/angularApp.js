(function() {

  var app = angular.module('flapperNews', ['ui.router']);

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'mainCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
          }]
        }
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'postsCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function($stateParams, posts) {
            return posts.get($stateParams.id);
          }]
        }
      });

      $urlRouterProvider.otherwise('home');
  }]);

  app.factory('posts', ['$http', function($http) {
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
      return $http.post('/posts', post).success(function(data) {
        o.posts.push(data);
      });
    };

    o.upvote = function(post) {
      return $http.put('/posts/' + post._id + '/upvote').success(function(data) {
        post.upvotes += 1;
      });
    };

    o.get = function(id) {
      return $http.get('/posts/' + id).then(function(res) {
        return res.data;
      });
    };

    o.addComment = function(id, comment) {
      return $http.post('/posts/' + id + '/comments', comment);
    };

    o.upvoteComment = function(post, comment) {
      return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote')
      .success(function(data) {
        comment.upvotes += 1;
      });
    };

    return o;
  }]);

  //create initial auth factory. We'll need to inject $http for interfacing with our server, and $window for interfacing with localStorage
  app.factory('auth', ['$http', '$window', function($http, $window) {
    var auth = {};

    //save token in local storage
    auth.saveToken = function(token) {
      $window.localStorage['flapper-news-token'] = token;
    };

    //get token from local storage
    auth.getToken = function(token) {
      return $window.localStorage['flapper-news-token'];
    };

    //return a boolean value for if the user is logged in
    auth.isLoggedIn = function(){
      var token = auth.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    //function currentUser() that returns the username of the user that's logged in
    auth.currentUser = function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    };

    //register function that posts a user to our /register route and saves the token returned
    auth.register = function(user){
      return $http.post('/register', user).success(function(data){
        auth.saveToken(data.token);
      });
    };

    // login function that posts a user to our /login route and saves the token returned
    auth.logIn = function(user){
      return $http.post('/login', user).success(function(data){
        auth.saveToken(data.token);
      });
    };

    //logout function that removes the user's token from localStorage, logging the user out.
    auth.logOut = function(){
      $window.localStorage.removeItem('flapper-news-token');
    };

    return auth;
  }]);

  app.controller('mainCtrl', ['$scope', 'posts', function($scope, posts) {

    //used to display all posts
    $scope.posts = posts.posts;

    $scope.addPost = function() {
      if (!$scope.title || $scope.title === '') {
        return;
      }

      posts.create({
        title: $scope.title,
        link: $scope.link
      });
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function(post) {
      posts.upvote(post);
    };
  }]);

  app.controller('postsCtrl', ['$scope', 'posts', 'post', function($scope, posts, post) {
    //used to get individual posts
    $scope.post = post;

    $scope.addComment = function() {
      if ($scope.body === '') {
        return;
      }

      posts.addComment(post._id, {
        body: $scope.body,
        author: 'user',
      }).success(function(comment) {
        $scope.post.comments.push(comment);
      });
      $scope.body = '';
    };

    $scope.incrementUpvotes = function(comment) {
      posts.upvoteComment(post, comment);
    };
  }]);

})();
