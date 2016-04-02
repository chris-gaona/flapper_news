(function() {
var express = require('express');
var router = express.Router();

// var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var jwt = require('express-jwt');
//middleware for authenticating jwt tokens
var auth = jwt({
  secret: 'SECRET', // TODO this should be stored in an ENV variable and kept off the codebase, same as it is in the User model
  userProperty: 'payload'
});



/* GET users listing. */

module.exports = router;

})();
