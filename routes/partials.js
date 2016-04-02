(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

  router.route('/partials/:name')
    .get(function(req, res, next) {
      res.render('partials/' + req.params.name, {
        title: 'Flapper News'
      });
    });

  module.exports = router;
})();
