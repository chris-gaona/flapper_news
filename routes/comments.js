(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

  var mongoose = require('mongoose');
  var Post = mongoose.model('Post');
  var Comment = mongoose.model('Comment');

  var jwt = require('express-jwt');
  //middleware for authenticating jwt tokens
  var auth = jwt({
    secret: 'SECRET', // TODO this should be stored in an ENV variable and kept off the codebase, same as it is in the User model
    userProperty: 'payload'
  });

  router.post('/posts/:post/comments', auth, function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;

    //Set the author field when creating comments
    comment.author = req.payload.username;

    comment.save(function(err, comment) {
      if (err) {return next(err);}

      req.post.comments.push(comment);
      req.post.save(function(err, post){
        if (err) {return next(err);}

        res.json(comment);
      });
    });
  });

  router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
    req.comment.upvote(function(err, comment) {
      if (err) {return next(err);}

      res.json(comment);
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

  //creates middleware for all comment urls to go through first
  router.param('comment', function(req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function(err, comment) {
      if (err) {return next(err)}

      if(!comment) {
        return next(new Error('can\'t find comment'));
      }

      req.comment = comment;
      return next();
    });
  });

  module.exports = router;

})();