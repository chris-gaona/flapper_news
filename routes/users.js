(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

  var mongoose = require('mongoose');
  var User = mongoose.model('User');

  var jwt = require('express-jwt');
  //middleware for authenticating jwt tokens
  var auth = jwt({
    secret: 'SECRET', // TODO this should be stored in an ENV variable and kept off the codebase, same as it is in the User model
    userProperty: 'payload'
  });

  router.get('/user/:username', auth, function(req, res, next) {
    var user = req.params.username;

    // if (req.payload.username != user) {
    //   return res.status(401).json({
    //     message: 'You cannot access this page'
    //   });
    // }

    User.findOne({username: user}, '_id username userPosts', function(err, user) {
      if (err) {return next(err);}
      console.log(user);
      // res.json(user);
      user.populate('userPosts', function(err, user) {
        if (err) {return next(err);}

        res.json(user);
      });
    });

  });

  module.exports = router;

})();
