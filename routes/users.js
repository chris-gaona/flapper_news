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

  router.get('/user/:username', function(req, res) {
    res.send('got a user!');
  });

  module.exports = router;

})();
