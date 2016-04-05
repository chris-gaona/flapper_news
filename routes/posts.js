(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

  var mongoose = require('mongoose');
  var Post = mongoose.model('Post');
  var Comment = mongoose.model('Comment');
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

    //adds author to post from json web token payload
    post.author = req.payload.username;

    User.findOne({username: req.payload.username}, 'userPosts', function(err, user) {
      if (err) {return next(err);}
      // res.json(user);
      user.userPosts.push(post);

      user.save(function(err, user) {
        if(err){ return next(err); }

        console.log('Success!');
      });
    });

    post.save(function(err, post){
      if(err){ return next(err); }

      res.json(post);
    });
  });

  router.delete('/posts/:post', auth, function(req, res, next) {
    if(req.post.author != req.payload.username) {
      console.log('sorry no can do');
      return res.status(401).send("invalid authorization");
    }

    console.log('you have access');

    Comment.remove({post: req.params.post}, function(err) {
      if (err) {return next(err);}
      console.log('Comment deleted');

      req.post.remove(function(err) {
        if (err) {return next(err);}

        console.log('Post deleted');
        res.send('Post Deleted');
      });
    });

    //find correct user in order to remove connected to deleted post
    User.findOne({_id: req.payload._id}, 'userPosts', function(err, user) {
      if (err) {return next(err);}

      //splice out the deleted post from userPosts array
      user.userPosts.splice(user.userPosts.indexOf(req.params.post), 1);

      user.save(function(err, user) {
        if(err){ return next(err); }

        console.log('user post info deleted');
      });
    });
  });

  router.get('/posts/:post', function(req, res) {
    req.post.populate('comments', function(err, post) {
      if (err) {return next(err);}

      res.json(post);
    });
  });

  router.put('/posts/:post/upvote', auth, function(req, res, next) {
    //req.payload give user info to Posts.js model method
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
