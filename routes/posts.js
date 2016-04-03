(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

  var mongoose = require('mongoose');
  var Post = mongoose.model('Post');
  var Comment = mongoose.model('Post');
  var User = mongoose.model('User');

  var jwt = require('express-jwt');
  //middleware for authenticating jwt tokens
  var auth = jwt({
    secret: 'SECRET', // TODO this should be stored in an ENV variable and kept off the codebase, same as it is in the User model
    userProperty: 'payload'
  });

  router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts){
      if(err){ return next(err); }

      res.json(posts);
    });
  });

  router.post('/posts', auth, function(req, res, next) {
    var post = new Post(req.body);

    //prevents user who created post from placing upvote
    post.usersWhoUpvoted.push(req.payload._id);

    post.author = req.payload.username;

    //Set the author field when creating posts
    post.author = req.payload.username;

    post.save(function(err, post){
      if(err){ return next(err); }

      res.json(post);
    });
  });

  router.get('/posts/:post', function(req, res) {
    req.post.populate('comments', function(err, post) {
      if (err) {return next(err);}

      res.json(post);
    });
  });

  router.put('/posts/:post/upvote', auth, function(req, res, next) {
    //req.payload give user infor to Posts.js model method
    req.post.upvote(req.payload, function(err, post) {
      if (err) {return next(err);}

      res.json(post);
    });
  });

  //creates middleware for all post urls to go through first
  router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function(err, post) {
      if (err) {return next(err)}

      if(!post) {
        return next(new Error('can\'t find post'));
      }

      req.post = post;
      return next();
    });
  });

  module.exports = router;

})();
